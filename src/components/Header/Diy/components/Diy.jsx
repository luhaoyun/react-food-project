import React, { useCallback, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import FoodTable from "./FoodTable/FoodTable";
import DiyContext from "../../../../store/diy-context";
import useFetch from "../../../../hooks/useFetch";

const diyRoot = document.getElementById('diy-root');


const Diy = (props) => {
    const [hanData, setHanData] = useState([
        {
            id: '1',
            attributes: {
                name: '汉堡包',
                desc: '百分百纯牛肉配搭爽脆酸瓜洋葱粒与美味番茄酱经典滋味让你无法抵挡！',
                price: 12,
                img: '/img/meals/1.png'
            }
        },
        {
            id: '2',
            attributes: {
                name: '双层吉士汉堡',
                desc: '百分百纯牛肉与双层香软芝，加上松软面包及美味酱料，诱惑无人能挡！',
                price: 20,
                img: '/img/meals/2.png'
            }
        }
    ]);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // http://localhost:1337/api/hans
    // 获取数据fetch prmoise版
    // useEffect(() => {
    //     // 数据开始加载
    //     setLoading(true);
    //     fetch('http://localhost:1337/api/hans')
    //         .then(response => {
    //             console.log(response)
    //             // 判断是否返回了数据, 可以根据返回response对象中的ok或者status或者statusText属性来判断
    //             if (response.ok === false) {

    //                 throw new Error('发生了错误')
    //             }

    //             return response.json()
    //         })

    //         .then(data => {
    //             setHanData(data.data);
    //             setLoading(false)
    //         })
    //         .catch((e) => {
    //             setLoading(false)
    //             console.log(e)
    //             setError(e)
    //         })

    // }, [])


    // 这里的fetchData只是单纯的读数据，并且会作为value属性传给context，因此在DIY组件中可全局调用
    // 在hook中定义的自定义钩子将fetchData进行了增删改查的扩展，可以在各个组件中重复使用，但注意，各组件之间的state依旧是相互独立的！！
    // 获取数据async await版
    const fetchData = useCallback(async () => {
        try {
            // 数据开始加载
            setLoading(true);
            const response = await fetch('http://localhost:1337/api/hans')
            // 判断是否返回了数据, 可以根据返回response对象中的ok或者status或者statusText属性来判断
            if (response.ok === true) {
                const data = await response.json()
                console.log(data)
                console.log('内部修改前', hanData)
                setHanData(data.data);
                console.log('内部修改后', hanData)

                // setLoading(false)
            } else {
                throw new Error('发生了错误')
            }
        } catch (error) {
            // setLoading(false)
            console.log(error.message)
            setError(error)
        } finally {
            setLoading(false)
        }
    }, [])

    // useEffect不支持异步函数，因此在外再套层函数即可
    // useEffect中的fetchData只会在组件初始化时去调用，因此后面的依赖数组为空数组，除非页面刷新导致组件重新初始化
    useEffect(() => {
        fetchData()
        console.log('修改后', hanData)
    }, [])


    return (
        // return ReactDOM.createPortal(

        // <div className={classes.Diy}>
        //     <div className={classes.Close}>
        //         <FontAwesomeIcon
        //             onClick={() => props.onHide()}
        //             icon={faXmark} />
        //     </div>
        //     <div className={classes.Table}>

        <DiyContext.Provider value={{ fetchData }}>
            {loading && <p>数据正在加载中......</p>}

            {(!loading && !error) &&
                <FoodTable hanData={hanData} />}

            {error && <p>{error.message} </p>}
        </DiyContext.Provider>
        // </div>
        // </div>
        // ,diyRoot);
    )


}

export default Diy