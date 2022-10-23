import { TYPE_ICONS } from '@/ultils/icons';
import { overrideTailwindClasses } from 'tailwind-override';
import Icon from '../Icon';

interface ISpinner {
	width: number;
	height: number;
	color?: string;
	className?: string;
}
const Spinner = (props: ISpinner) => {
	const { width, height, color, className } = props;
	return (
		<div
			className={overrideTailwindClasses(
				`flex justify-center items-center animate-spin ${className}`
			)}
		>
			<Icon type={TYPE_ICONS.SPINNER} color={color} width={width} height={height} />
		</div>
	);
};

export default Spinner;
