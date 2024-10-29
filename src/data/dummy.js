import { Heart, LayoutDashboard, ShoppingBag, SquareTerminal, UserRound } from "lucide-react";
//! general menu 
export const Menus = [
    {
        name: 'Shop',
        link: 'shop'
    },

    {
        name: 'Stories',
        link: 'stories'
    }, {
        name: 'About',
        link: 'about'
    },
]

//! profile menu option if authenticated 
export const menuItems = [
    {
        link: "myprofile",
        name: "Profile",
        icon: UserRound
    },

    {
        link: "orders",
        name: "Orders",
        icon: ShoppingBag,
    },
    {
        link: "wishlist",
        name: "Wishlist",
        icon: Heart,
    },
];

//! admin menu option  if the user is authenticated and is  admin 
export const adminMenu = [
    {
        link: 'dashbord',
        name: 'Dashbord',
        icon: LayoutDashboard
    },
    {
        link: 'contact',
        name: 'contact',
        icon: LayoutDashboard
    }
]

export const links = [
    {
        title: 'Dashboard',
        links: [
            {
                name: 'Website Prompt',
                icon: SquareTerminal,
            },
            {
                name: 'SubDomain',
                icon: SquareTerminal,
            },
            {
                name: 'PageLinksFinder',
                icon: SquareTerminal,
            },
        ],
    },

    // {
    //     title: 'Pages',
    //     links: [
    //         {
    //             name: 'map',
    //             icon: LayoutDashboard,
    //         },
    //         {
    //             name: 'timeline',
    //             icon: LayoutDashboard,
    //         },
    //         {
    //             name: 'orders',
    //             icon: LayoutDashboard,
    //         },
    //         {
    //             name: 'employees',
    //             icon: Heart,
    //         },
    //         {
    //             name: 'customers',
    //             icon: Heart,
    //         },
    //     ],
    // },
    // {
    //     title: 'Apps',
    //     links: [
    //         {
    //             name: 'calendar',
    //             icon: UserRound,
    //         },
    //         {
    //             name: 'kanban',
    //             icon: UserRound,
    //         },
    //         {
    //             name: 'editor',
    //             icon: UserRound,
    //         },
    //         {
    //             name: 'color-picker',
    //             icon: UserRound,
    //         },
    //     ],
    // },






    // {
    // title: 'Charts',
    // links: [
    // {
    // name: 'line',
    // icon: <UserRound />,
    // },
    // {
    // name: 'area',
    // icon: <UserRound />,
    // },

    // {
    // name: 'bar',
    // icon: <UserRound />,
    // },
    // {
    // name: 'pie',
    // icon: <UserRound />,
    // },
    // {
    // name: 'financial',
    // icon: <UserRound />,
    // },
    // {
    // name: 'color-mapping',
    // icon: <UserRound />,
    // },
    // {
    // name: 'pyramid',
    // icon: <UserRound />,
    // },
    // {
    // name: 'stacked',
    // icon: <UserRound />,
    // },
    // ],
    // },
];