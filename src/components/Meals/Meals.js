import React from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import { Result, Spin } from 'antd';
import Meal from "./Meal/Meal";
import classes from './Meals.module.css';

const antIcon = (
    <LoadingOutlined style={{ fontSize: 24, }} spin />
);

const Meals = (props) => {
    return (

        /*现在将滚动条设置给了Meals*/
        <div className={classes.Meals}>
            {/* 处理页面加载和错误时的界面 */}
            {props.loading && <Spin
                className={classes.Loading}
                indicator={antIcon}
                children={<p sclassName={classes.Loading}>'数据加载中.....'</p>}
            />
            }
            {props.error && <Result
                className={classes.Loading}
                status="404"
                title="404"
                subTitle={props.error.message} />}

            {/* 食物栏组件 */}
            {(!props.loading && !props.error) &&
                props.mealsData.map(item => <Meal key={item.id} meal={item} />)}
        </div>
    );
};

export default Meals;
