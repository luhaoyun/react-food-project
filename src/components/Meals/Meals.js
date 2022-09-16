import React from 'react';
import Meal from "./Meal/Meal";
import classes from './Meals.module.css';

/*
*   食物列表的组件
* */
const Meals = (props) => {
    return (

        /*现在将滚动条设置给了Meals*/
        <div className={classes.Meals}>
            {/* {props.mealsData.map(item =>
                <Meal
                    key={item.id}
                    meal={item}
                />
            )} */}

            {props.loading && <p>数据正在加载中...</p>}
            {(!props.loading && !props.error) &&
                props.mealsData.map(item => <Meal key={item.id} meal={item} />)}
            {props.error && <p>数据加载异常！</p>}
        </div>
    );
};

export default Meals;
