function TimeSelector(props)
{
	const {defaultClassName, activeClassName, setMode, mode} = props;

	return (
		<div className="flex justify-around mx-4">
			<button className={(mode == 0 ? activeClassName : defaultClassName) + " rounded-l-full"} onClick={() => {
				if (mode != 0)
					setMode(0)
			}}>SINCE LAST MOUTH</button>
			<button className={(mode == 1 ? activeClassName : defaultClassName)} onClick={() => {
				if (mode != 1)
					setMode(1)
			}}>SINCE 6 MOUTHS</button>
			<button className={(mode == 2 ? activeClassName : defaultClassName) + " rounded-r-full"} onClick={() => {
				if (mode != 2)
					setMode(2)
			}}>SINCE ALL TIME</button>
		</div>
	);
}

export default TimeSelector;