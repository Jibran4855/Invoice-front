import React, { useState } from "react";
import classNames from "classnames";
import { Collapse, NavItem, NavLink } from "reactstrap";
import { Link } from "react-router-dom";

const SubMenu = (props) => {
    const [collapsed, setCollapsed] = useState(true);
    const toggle = () => setCollapsed(!collapsed);
    const { icon, title, items } = props;

    return (
        <div className="sub-menu-box">
            <NavItem
                onClick={toggle}
                className={classNames({ "menu-open": !collapsed })}
            >
                <NavLink className="dropdown-toggle">
                    <i className={icon} />
                    {title}
                </NavLink>
            </NavItem>
            <Collapse
                isOpen={!collapsed}
                navbar
                className={classNames("items-menu", { "mb-1": !collapsed })}
                in={2} key={2}
            >
                {
                    items?.map((item, index) => (
                        !item?.isHideSidebar && <NavItem key={index} className="pl-4">
                            <NavLink tag={Link} to={item.path}>
                                {item.name}
                            </NavLink>
                        </NavItem>
                    ))
                }
            </Collapse>
        </div>
    );
};

export default SubMenu;
