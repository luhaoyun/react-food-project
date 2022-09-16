import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import classes from './index.module.css';
import SearchFood from './SearchFood'
import DiyApp from './Diy/DiyApp';

const Header = (props) => {

    // 添加一个state设置自定义栏的显示于隐藏
    const [showDiy, setShowDiy] = useState(false);


    return (
        <div className={classes.FilterMeals}>
            <SearchFood onFilter={props.onFilter} />

            <div className={classes.Diy}>
                <FontAwesomeIcon icon={faGear} onClick={() => setShowDiy(true)} />
            </div>

            {showDiy && <DiyApp onHide={() => setShowDiy(false)} />}

        </div>
    );
};

export default Header