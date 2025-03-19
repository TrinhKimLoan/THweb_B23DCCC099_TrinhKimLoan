export default [
	{
		path: '/user',
		layout: false,
		routes: [
			{
				path: '/user/login',
				layout: false,
				name: 'login',
				component: './user/Login',
			},
			{
				path: '/user',
				redirect: '/user/login',
			},
		],
	},

	///////////////////////////////////
	// DEFAULT MENU
	{
		path: '/dashboard',
		name: 'Dashboard',
		component: './TrangChu',
		icon: 'HomeOutlined',
	},
	{
		path: '/gioi-thieu',
		name: 'About',
		component: './TienIch/GioiThieu',
		hideInMenu: true,
	},
	{
		path: '/random-user',
		name: 'RandomUser',
		component: './RandomUser',
		icon: 'ArrowsAltOutlined',
	},
	{
		path: '/to-do-list',
		name: 'ToDoList',
		component: './ToDoList',
		icon: 'UnorderedListOutlined',
	},
	{
		path: '/guess-number',
		name: 'RandomNumber',
		component: './RandomNum',
		icon: 'UnorderedListOutlined',
	},
	
	// {
	// 	path: '/study-tracker',
	// 	name: 'ToDoList',
	// 	component: './StudyTracker',
	// 	icon: 'UnorderedListOutlined',
	// },

	

		{
		  path: '/study-tracker',
		  name: '📚 StudyTracker',
		  routes: [
			{ path: '/study-tracker/subjects', name: '📘 Quản lý Môn học', component: './StudyTracker/Subjects' },
			{ path: '/study-tracker/progress', name: '⏳ Tiến độ Học tập', component: './StudyTracker/Progress' },
			{ path: '/study-tracker/goals', name: '🎯 Mục tiêu Học tập', component: './StudyTracker/Goals' },
		  ],
		},
		{
			path: '/keo-bua-bao',
			name: 'Play Game',
			component: "@/pages/keo-bua-bao/index",
			icon: 'HomeOutlined',
		},
		{
            path: '/de-tu-luan',
            name: 'Câu hỏi tự luận',
            routes: [
              { path: '/de-tu-luan/khoi-kien-thuc', name: 'Các khối kiến thức', component: './ManageQuestion/KhoiKienThuc' },
              { path: '/de-tu-luan/mon-hoc', name: 'Các môn học', component: './ManageQuestion/MonHoc' },
              { path: '/de-tu-luan/cau-hoi', name: 'Các câu hỏi', component: './ManageQuestion/CauHoi' },
              { path: '/de-tu-luan/de-thi', name: 'Đề thi', component: './ManageQuestion/DeThi' },
            ],
          },

		  
		  {
			path: '/management',
			name: 'BT buổi 3',
			routes: [
				{
					path: '/management/admin/employees',
					name: 'Employee Management',
					component: './management/admin/employees',
				  },
				{
				  path: '/management/admin/services',
				  name: 'Service Management',
				  component: './management/admin/services',
				},
				{
					path: '/management/admin/stats',
					name: 'Thống kê',
					component: './management/admin/stats/ReportPage',
				  },				
				// khác
				{
					path: '/management/app-service/booking', name: 'Đặt lịch', component: './AppService/Booking' ,
				  },
				  {
					path: '/management/app-service/staff', name: 'Lịch hẹn', component: './AppService/Staff/Index' ,
				  },
				  {
					path: '/management/reviews/customer',
					name: 'Khách hàng đánh giá',
					component: './management/reviews/CustomerReviewsPage',
				  },
				  {
					path: '/management/reviews/nhanvien',
					name: 'Nhân viên phản hồi',
					component: './management/reviews/EmployeeReviewsPage',
				  }
			  ],
  
  
		},

		


	  

	// DANH MUC HE THONG
	// {
	// 	name: 'DanhMuc',
	// 	path: '/danh-muc',
	// 	icon: 'copy',
	// 	routes: [
	// 		{
	// 			name: 'ChucVu',
	// 			path: 'chuc-vu',
	// 			component: './DanhMuc/ChucVu',
	// 		},
	// 	],
	// },

	{
		path: '/notification',
		routes: [
			{
				path: './subscribe',
				exact: true,
				component: './ThongBao/Subscribe',
			},
			{
				path: './check',
				exact: true,
				component: './ThongBao/Check',
			},
			{
				path: './',
				exact: true,
				component: './ThongBao/NotifOneSignal',
			},
		],
		layout: false,
		hideInMenu: true,
	},
	{
		path: '/',
	},
	{
		path: '/403',
		component: './exception/403/403Page',
		layout: false,
	},
	{
		path: '/hold-on',
		component: './exception/DangCapNhat',
		layout: false,
	},
	{
		component: './exception/404',
	},
];
