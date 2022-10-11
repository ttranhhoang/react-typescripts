import { SVGProps } from 'react';
import { overrideTailwindClasses } from 'tailwind-override';

interface IIcon extends SVGProps<SVGSVGElement> {
	width?: string;
	height?: string;
	color?: string;
	type: string;
}
const Icon = (props: IIcon) => {
	const { color, height = 24, width = 24, type, className, ...otherProps } = props;
	return (
		<svg
			style={{ width, height }}
			viewBox="0 0 24 24"
			{...otherProps}
			className={overrideTailwindClasses(`block cursor-pointer ${className}`)}
		>
			<path fill={color} d={type} />
		</svg>
	);
};

export default Icon;
