import { useState, useCallback } from "react";

// 此自定义hook函数用于在DIY组件中对数据进行增删改查
/** reqObj用来存储请求的参数
 * {
 *         url 请求的地址
 *         method 请求的方法
 *         body 请求体
 * }
 * 
 * callback 回调函数，请求发送成功后执行
*/


const useFetch = (reqObj, callback) => {
    // 这四个yourData，loading，error，fetchData会作为钩子函数的返回值
    const [yourData, setYourData] = useState([])
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const fetchData = useCallback(async (body) => {
        try {
            // 数据开始加载
            setLoading(true);
            const response = await fetch(`http://localhost:1337/api/${reqObj.url}`, {
                method: reqObj.method || 'get',
                headers: {
                    "Content-type": reqObj.type || "application/json"
                },
                // 如果method没有输入或是输入的是'get'方法，则返回null，否则则用下面的JSON数据
                // body: (!reqObj.method || reqObj.method.toLowerCase() === 'get') ?
                //     null :
                //     JSON.stringify({ data: reqObj.body })

                // 只有添加和修改data 需要填写body配置项；因为body的数据是动态的，最好由外部传进来
                body: body ? JSON.stringify({ data: body }) : null

            })
            // 判断是否返回了数据, 可以根据返回response对象中的ok或者status或者statusText属性来判断
            if (response.ok === true) {
                const data = await response.json()
                // console.log(data)
                setYourData(data.data);

                // callback 回调函数，请求发送成功后执行！！！！！！！！这里用来执行页面的自动刷新
                callback && callback();

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
    }, []);


    // 设置返回值
    // return {
    //     yourData:yourData,
    //     error:error,
    //     loading:loading,
    //     fetchData:fetchData
    // }
    return {
        yourData, loading, error, fetchData  //fetchdata是函数，里面需要传请求体body参数
    }

}

export default useFetch

