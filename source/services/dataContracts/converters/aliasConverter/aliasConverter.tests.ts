import { AliasConverter } from './aliasConverter';
import { converterService } from '../converters';

describe('aliasConverter', (): void => {
	let aliasConverter: AliasConverter<string>;

	beforeEach((): void => {
		aliasConverter = new AliasConverter<string>('propValue');
	});

	it('should get the property from the parent context using the specified property name', (): void => {
		let parent: any = { propValue: 'value' };
		expect(aliasConverter.fromServer(undefined, parent)).to.equal('value');
	});

	it('should set the value on the parent context using the specified property name', (): void => {
		let parent: any = {};
		aliasConverter.toServer('value', parent);
		expect(parent.propValue).to.equal('value');
	});

	it('should return null if alias property doesnt exist on the parent', (): void => {
		let parent: any = {};
		expect(aliasConverter.fromServer(undefined, parent)).to.be.null;
	});

	it('should apply another converter to the aliased property', (): void => {
		let testConverter: any = {
			fromServer: sinon.spy(),
			toServer: sinon.spy(),
		};

		aliasConverter = new AliasConverter<string>('propValue', testConverter);

		let parent: any = { propValue: 'value' };

		aliasConverter.fromServer(undefined, parent);

		sinon.assert.calledOnce(testConverter.fromServer);
		sinon.assert.calledWith(testConverter.fromServer, 'value');

		aliasConverter.toServer('value', parent);

		sinon.assert.calledOnce(testConverter.toServer);
		sinon.assert.calledWith(testConverter.toServer, 'value');
	});

	describe('integrationTest', (): void => {
		let testConverter: any;
		let transform: any;
		let serverData: any;

		beforeEach((): void => {
			testConverter = {
				fromServer(value: number): number { return value + 5; },
				toServer(value: number): number { return value - 5; },
			};

			transform = {
				value: new AliasConverter('valueFromServer'),
				number: new AliasConverter('numberFromServer', testConverter),
			};

			serverData = {
				valueFromServer: 5,
				numberFromServer: 5,
			};
		});

		it('should apply an alias as part of a transform mapping', (): void => {
			let transformedData: any = converterService.applyTransform(serverData, transform, false);

			expect(transformedData.value).to.equal(5);
			expect(transformedData.number).to.equal(10);

			serverData = converterService.applyTransform(transformedData, transform, true);

			expect(serverData.valueFromServer).to.equal(5);
			expect(serverData.numberFromServer).to.equal(5);
		});

		it('should cleanup the value at the original key of the alias', (): void => {
			let transformedData: any = converterService.applyTransform(serverData, transform, false);

			expect(transformedData.valueFromServer).to.not.exist;
			expect(transformedData.numberFromServer).to.not.exist;

			serverData = converterService.applyTransform(transformedData, transform, true);

			expect(serverData.value).to.not.exist;
			expect(serverData.number).to.not.exist;
		});
	});
});
