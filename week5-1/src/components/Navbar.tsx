import { NavLink } from "react-router-dom";

const LINKS = [
  { to: "/", label: "홈" },
  { to: "/movies/popular", label: "인기 영화" },
  { to: "/movies/now_playing", label: "상영 중" },
  { to: "/movies/top_rated", label: "평점 높은" },
  { to: "/movies/upcoming", label: "개봉 예정" },
];

const AUTHLINKS = [
  { to: "/login", label: "로그인" },
  { to: "/signup", label: "회원가입" },
];

const Navbar = () => {
  return (
    <div className="flex gap-3 p-4">
      {LINKS.map(({ to, label }) => (
        <NavLink
          key={to}
          to={to}
          className={({ isActive }) => (isActive ? "text-[#2593ff] font-bold" : "text-gray-500")}
        >
          {label}
        </NavLink>
      ))}
      <div className="flex gap-3 justify-end flex-1">
        {AUTHLINKS.map(({ to, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) => (isActive ? "text-[#2593ff] font-bold" : "text-gray-500")}
          >
            {label}
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default Navbar;
