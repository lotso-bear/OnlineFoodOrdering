import React, {useEffect, useState} from 'react'
import { Button, Card, List, message, Select, Tooltip } from "antd";
import {addItemToCart, getRestaurants, getMenus} from "../utils";
import { PlusOutlined } from "@ant-design/icons";

const { Option } = Select;

const AddToCartButton = ({ itemId }) => {
    const [loading, setLoading] = useState(false);

    const AddToCart = () => {
        setLoading(true);
        addItemToCart(itemId)
            .then(() => message.success(`Successfully add item`))
            .catch((err) => message.error(err.message))
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <Tooltip title="Add to shopping cart">
            <Button
                loading={loading}
                type="primary"
                icon={<PlusOutlined />}
                onClick={AddToCart}
            />
        </Tooltip>
    );
};
function FoodList(props) {
    const [loading, setLoading] = useState(false);
    const [curRest, setCurRest] = useState();
    const [restaurants, setRestaurants] = useState([]);
    const [foodData, setFoodData] = useState([]);
    // didMount + didUpdate
    useEffect(() => {
        setLoading(true);
        // step1: set loading status
        // step2: fetch restaurants data from server
        // step3:
        //  case1: if success, setRestaurants
        //  case2: failed
        //  finally -> set loading status -> false
        getRestaurants()
            .then( resData => {
                console.log(resData);
                setRestaurants(resData);
            })
            .catch(err => {

            })
            .finally(() => {
                setLoading(false);
            }
        )
    }, [])

    useEffect( () => {
        setLoading(true);
        getMenus(curRest)
            .then( menuData => {
                console.log(menuData)
                setFoodData(menuData);
            })
            .catch(err => {})
            .finally(setLoading(false));
    }, [curRest])
    return (
        <div>
            <Select value={curRest}
                    loading={loading}
                    placeholder="Select a restaurant"
                    style={{width: 120}}
                    onSelect={value => setCurRest(value)}
            >
                {
                    restaurants.map( item => {
                        return <Option key={item.id} value={item.id}>{item.name}</Option>
                    })
                }

            </Select>
            {
                curRest &&
                <List
                    style={{ marginTop: 20 }}
                    loading={loading}
                    grid={{
                        gutter: 16,
                        xs: 1,
                        sm: 2,
                        md: 4,
                        lg: 4,
                        xl: 3,
                        xxl: 3,
                    }}
                    dataSource ={foodData}
                    renderItem={item => (
                      <List.Item>
                          <Card title ={item.name} extra={<AddToCartButton itemId ={item.id} />}>
                              <img src={item.imageUrl}
                                   alt ={item.name}
                                   style={{ height: "auto", width: "100%", display: "block" }}
                              />
                              {`Price: ${item.price}`}
                          </Card>
                      </List.Item>
                    )}
                />
            }
        </div>

    )
};

export default FoodList;