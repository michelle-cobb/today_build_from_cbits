app.actions.moodRater = function (tool_id, guid, options) {
    switch(true) {

		//case (score(tool_id, 1, guid) == 3):
		//	goToAndPlayId([1820,1826,1827,1828,1829,1847,1848,1849,1850,1851]);
		//	break;

		//case (score(tool_id, 1, guid) == 4):
		//	goToAndPlayId([1819,1822,1823,1824,1825,1842,1843,1844,1845,1846]);
		//	break;

	//	case (score(tool_id, 1, guid) == 5):
	//		goToAndPlayId([1819,1822,1823,1824,1825,1842,1843,1844,1845,1846]);
	//		break;

	//	case (score(tool_id, 1, guid) == 6):
	//		goToAndPlayId([1831,1832,1833,1834,1835,1836,1837,1838,1839,1840]);
	//		break;

	//	case (score(tool_id, 1, guid) < 3):
		//	goToAndPlayId([1868]);
		//	break;         

//New Logic

	// If overall mood is very bad, route to Grounding Toolbox
	case (score(tool_id,1,guid) == "Very Bad" ):
		goToAndPlayId([1902]);
		break;;

	// if overall mood is bad or a little bad 
	case (score(tool_id,1,guid) == "Bad" || score(tool_id,1,guid) == "A Little Bad"):
		goToAndPlayId([2019]);
		break;
	
	// if overall mood is neutral or mixed, cycle through randomly the following
	case(score(tool_id,1,guid) == "In Between / Mixed" ):
		goToAndPlayId([1820,1826,1827,1828,1829,1847,1848,1849,1850,1851]);
		break;
	
	
	// if overall mood is good, cycle through randomly the following:
	case(score(tool_id,1,guid) == "A Little Good" || score(tool_id,1,guid) == "Good"):
		goToAndPlayId([1819,1822,1823,1824,1825,1842,1843,1844,1845,1846]);
		break;

	// if overall mood is very good, cycle through randomly the following:
	case(score(tool_id,1,guid) == "Very Good"):
		goToAndPlayId([1831,1832,1833,1834,1835,1836,1837,1838,1839,1840]);
		break;
	}	
};
