interface IIcon {
	width?: string;
	height?: string;
	color?: string;
	type: string;
}
const Icon = (props: IIcon) => {
	const { color, height, width, type, ...otherProps } = props;
	return (
		<svg style={{ width, height }} viewBox="0 0 24 24" {...otherProps}>
			<path fill={color} d={type} />
		</svg>
	);
};

export default Icon;
