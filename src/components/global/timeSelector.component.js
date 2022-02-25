function TimeSelector(props)
{
	const {primaryColor, secondaryColor, activeColor, setMode, mode} = props;

	return (
		<div className="flex justify-around mx-4">
			<button className={(mode == 0 ? secondaryColor : primaryColor) + " rounded-l-full w-full tracking-widest transition-colors text-sm active:" + activeColor + " hover:" + secondaryColor + " text-white h-12 pl-6 pr-6"} onClick={() => {
				if (mode != 0)
					setMode(0)
			}}>SINCE LAST MOUTH</button>
			<button className={(mode == 1? secondaryColor : primaryColor) + " w-full tracking-widest transition-colors text-sm active:" + activeColor + " hover:" + secondaryColor + " text-white h-12 pl-6 pr-6"} onClick={() => {
				if (mode != 1)
					setMode(1)
			}}>SINCE 6 MOUTHS</button>
			<button className={(mode == 2 ? secondaryColor : primaryColor) + " rounded-r-full w-full tracking-widest transition-colors text-sm active:" + activeColor + " hover:" + secondaryColor + " text-white h-12 pl-6 pr-6"} onClick={() => {
				if (mode != 2)
					setMode(2)
			}}>SINCE ALL TIME</button>
		</div>
	);
}

export default TimeSelector;