import React, { useCallback, useEffect, useState } from "react";
import { Result, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import FoodTable from "./FoodTable/FoodTable";
import DiyContext from "../../../../store/diy-context";

const diyRoot = document.getElementById('diy-root');
const antIcon = (
    <LoadingOutlined style={{ fontSize: 24, }} spin />
);

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

    // 数据源:http://localhost:1337/api/hans
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
        <DiyContext.Provider value={{ fetchData }}>
            {loading && <Spin
                style={{ margin: '50px', textAlign: 'center' }}
                indicator={antIcon}
                children={<p style={{ margin: '50px', textAlign: 'center' }}>'数据加载中.....'</p>}
            />
            }

            {(!loading && !error) &&
                <FoodTable hanData={hanData} />}

            {error && <Result
                style={{ margin: '50px', textAlign: 'center' }}
                status="404"
                title="404"
                subTitle={error.message} />}
        </DiyContext.Provider>
    )


}

export default Diy