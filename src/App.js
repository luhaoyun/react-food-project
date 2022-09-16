import React, { useCallback, useEffect, useReducer, useState } from 'react';
import Meals from "./components/Meals/Meals";
import CartContext from "./store/cart-context";
import Header from "./components/Header"
import Cart from "./components/Cart/Cart";


// 模拟一组食物数据
const MEALS_DATA = [
    {
        id: '1',
        title: '汉堡包',
        desc: '百分百纯牛肉配搭爽脆酸瓜洋葱粒与美味番茄酱经典滋味让你无法抵挡！',
        price: 12,
        img: '/img/meals/1.png'
    },
    {
        id: '2',
        title: '双层吉士汉堡',
        desc: '百分百纯牛肉与双层香软芝，加上松软面包及美味酱料，诱惑无人能挡！',
        price: 20,
        img: '/img/meals/2.png'
    },
    {
        id: '3',
        title: '巨无霸',
        desc: '两块百分百纯牛肉，搭配生菜、洋葱等新鲜食材，口感丰富，极致美味！',
        price: 24,
        img: '/img/meals/3.png'
    }, {
        id: '4',
        title: '麦辣鸡腿汉堡',
        desc: '金黄脆辣的外皮，鲜嫩幼滑的鸡腿肉，多重滋味，一次打动您挑剔的味蕾！',
        price: 21,
        img: '/img/meals/4.png'
    }, {
        id: '5',
        title: '板烧鸡腿堡',
        desc: '原块去骨鸡排嫩滑多汁，与翠绿新鲜的生菜和香浓烧鸡酱搭配，口感丰富！',
        price: 22,
        img: '/img/meals/5.png'
    }, {
        id: '6',
        title: '麦香鸡',
        desc: '清脆爽口的生菜，金黄酥脆的鸡肉。营养配搭，好滋味的健康选择！',
        price: 14,
        img: '/img/meals/6.png'
    }, {
        id: '7',
        title: '吉士汉堡包',
        desc: '百分百纯牛肉与香软芝士融为一体配合美味番茄醬丰富口感一咬即刻涌现！',
        price: 12,
        img: '/img/meals/7.png'
    }
];
// id: item.id,
// title: item.attributes.name,
// desc: item.attributes.desc,
// price: item.attributes.price,
// img: item.attributes.img

// 定义cartReducer
// 具体dispatch的操作定义在UI的Count组件中
const cartReducer = (state, action) => {
    // 复制购物车
    const newCart = { ...state };

    switch (action.type) {
        default:
            return state;
        case 'ADD':
            if (newCart.items.indexOf(action.meal) === -1) {
                newCart.items.push(action.meal);
                action.meal.amount = 1;
            } else {
                action.meal.amount += 1;
            }
            newCart.totalAmount += 1;
            newCart.totalPrice += action.meal.price;
            return newCart;
        case 'REMOVE':
            action.meal.amount -= 1;
            if (action.meal.amount === 0) {
                newCart.items.splice(newCart.items.indexOf(action.meal), 1);
            }
            newCart.totalAmount -= 1;
            newCart.totalPrice -= action.meal.price;
            return newCart;
        case 'CLEAR':
            newCart.items.forEach(item => delete item.amount);
            newCart.items = [];
            newCart.totalAmount = 0;
            newCart.totalPrice = 0;
            return newCart;
    }
};

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
