import React, { useContext } from "react";
import DiyContext from "../../../../../store/diy-context";

import { AddFood } from "./AddFood/AddFood";
import FoodItem from "./FoodItem";
import classes from './FoodTable.module.css'

const FoodTable = (props) => {
    // console.log('组件重新渲染了')
    const { hanData } = props

    // 使用store内的fetchData方法
    const ctx = useContext(DiyContext)

    const loadDataHandler = () =>{
        ctx.fetchData()
    }

    return (
        <>
            <button onClick={loadDataHandler}>提取数据</button>
            <table className={classes.Content}>
                <caption>汉堡列表</caption>
                <thead>
                    <tr>
                        <th>名称</th>
                        <th>简介</th>
                        <th>价格</th>
                        <th>图片</th>
                        <th>操作</th>
                    </tr>
                </thead>

                <tbody>
                    {hanData.map(han => <FoodItem key={han.id} han={han}/>)}
                </tbody>

                <tfoot><AddFood /></tfoot>
            </table>
        </>
    )
}

export default FoodTable;