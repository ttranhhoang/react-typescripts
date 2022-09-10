import Button from '@/components/Button';
import Input from '@/components/Input';
import { FormValuesLogin } from '@/interfaces/FormValues';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

const Login = () => {
	const { control, handleSubmit } = useForm<FormValuesLogin>();
	const navigate = useNavigate();
	const onSubmit = handleSubmit((data: FormValuesLogin) => {
		console.log('data', data);
		navigate('/users');
	});
	return (
		<div className="flex flex-col justify-center items-center h-full bg-gradient-to-r from-purple-500 to-pink-500">
			<div className="border rounded-md flex flex-col justify-center items-center p-10 w-2/6 gap-5">
				<div className="uppercase text-2xl text-white">Login</div>
				<img src="images/background.png" alt="images/background.png" className="w-52" />
				<form className="flex flex-col gap-2 w-full" onSubmit={onSubmit}>
					<Input control={control} type="text" name="firstName" label="First Name" />
					<Input control={control} type="text" name="lastName" label="Last Name" />
					<Button type="submit" label="Login" form="" onClick={onSubmit}></Button>
				</form>
			</div>
		</div>
	);
};

export default Login;
