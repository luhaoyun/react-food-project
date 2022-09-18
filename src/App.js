import React, { useCallback, useEffect, useReducer, useState } from 'react';
import Meals from "./components/Meals/Meals";
import CartContext from "./store/cart-context";
import Header from "./components/Header"
import Cart from "./components/Cart/Cart";
import cartReducer from './store/cartReducer'


// 模拟一组食物数据
const MEALS_DATA = [
    {
        id: '1',
        title: '汉堡包',
        desc: '百分百纯牛肉配搭爽脆酸瓜洋葱粒与美味番茄酱经典滋味让你无法抵挡！',
        price: 12,
        img: '/img/meals/1.png'
    }
];

const App = () => {
    // console.log('组件重新渲染了')
    // 创建一个state用来存储食物列表
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [mealsData, setMealsData] = useState(MEALS_DATA);
    const fetchData = useCallback(async () => {
        try {
            // 数据开始加载
            setLoading(true);
            const response = await fetch('http://localhost:1337/api/hans')
            // 判断是否返回了数据, 可以根据返回response对象中的ok或者status或者statusText属性来判断
            if (response.ok === true) {
                const data = await response.json()
                console.log(data)
                const mealArray = data.data
                const newArr = mealArray.map(items => {
                    return {
                        id: items.id,
                        title: items.attributes.name,
                        desc: items.attributes.desc,
                        price: items.attributes.price,
                        img: items.attributes.img
                    }
                })
                console.log('内部setMealData前--->', newArr)

                setMealsData(newArr);
                console.log('内部setMealsData后', mealsData)
            } else {
                throw new Error('发生了错误')
            }
        } catch (error) {
            setError(error)
            console.log(error.message)
        } finally {
            setLoading(false)
        }
    }, [])

    // useEffect不支持异步函数，因此在外再套层函数即可
    // useEffect中的fetchData只会在组件初始化时去调用，因此后面的依赖数组为空数组，除非页面刷新导致组件重新初始化
    useEffect(() => {
        fetchData()
    }, [])


    const [cartData, cartDispatch] = useReducer(cartReducer, {
        items: [],
        totalAmount: 0,
        totalPrice: 0
    });

    // 创建一个过滤meals的函数
    const filterHandler = (keyword) => {
        const newMealsData = mealsData.filter(item => {
            return item.title.indexOf(keyword) !== -1
        });
        setMealsData(newMealsData);
    };

    return (
        <>
            <Header onFilter={filterHandler} />
            <CartContext.Provider value={{ ...cartData, cartDispatch }}>
                <Meals mealsData={mealsData} loading={loading} error={error} />
                <Cart />
            </CartContext.Provider>
        </>

    );
};

export default App;
