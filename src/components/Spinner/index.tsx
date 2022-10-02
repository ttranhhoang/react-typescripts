import { ICON } from '@/ultils/icons';
import { overrideTailwindClasses } from 'tailwind-override';
import Icon from '../Icon';

interface ISpinner {
	width: string;
	height: string;
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
			<Icon type={ICON.SPINNER} color={color} width={width} height={height} />
		</div>
	);
};

export default Spinner;
