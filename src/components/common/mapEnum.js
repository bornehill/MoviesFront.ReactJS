export function mapEnumToDropdown(enumType) {
	return Object.keys(enumType).map((typeValue) => {
		return {
			value: typeValue,
			text: enumType[typeValue],
		};
	});
}

export function mapEnumToObject(enumType) {
	const enumObject = {};

	Object.keys(enumType).forEach((typeValue) => {
		enumObject[typeValue] = false;
	});

	return enumObject;
}
