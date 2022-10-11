import { COLORS } from '@/ultils/color';
import { TYPE_ICONS } from '@/ultils/icons';
import { HTMLAttributes } from 'react';
import Icon from '../Icon';
import { overrideTailwindClasses } from 'tailwind-override';

interface IAccountBadge extends HTMLAttributes<HTMLDivElement> {
	typeIcon: TYPE_ICONS;
	checked: boolean;
}
const IconActived = (props: IAccountBadge) => {
	const { checked, typeIcon, className } = props;
	return (
		<div className={overrideTailwindClasses(`relative flex cursor-pointer ${className ?? ''}`)}>
			<span className="inline-block">
				<Icon type={typeIcon} width="32" height="32" color={COLORS.GRAY} />
			</span>
			<span
				className="absolute bottom-0 right-0 rounded-full p-0.5"
				style={{ background: `${checked ? COLORS.SUCCESS_COLOR : COLORS.ERROR_COLOR}` }}
			>
				<Icon
					type={checked ? TYPE_ICONS.CHECK_SUCESS : TYPE_ICONS.CHECK_ERROR}
					width="12"
					height="12"
					color={COLORS.WHITE_SNOW}
				/>
			</span>
		</div>
	);
};

export default IconActived;
