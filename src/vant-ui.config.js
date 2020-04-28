import { Button, Icon, Tabbar, TabbarItem, Col, Row, Image, Swipe, SwipeItem, Search, Divider, NavBar, Tag, Panel, Collapse, CollapseItem, Cell, Form, Empty, Field, Toast  } from 'vant'

let arr = [Button, Icon, Tabbar, TabbarItem, Col, Row, Image, Swipe, SwipeItem, Search, Divider, NavBar, Tag, Panel, Collapse, CollapseItem, Cell, Form, Empty, Field, Toast ];

export default function (Vue) {
    arr.forEach(component => Vue.use(component))
}
