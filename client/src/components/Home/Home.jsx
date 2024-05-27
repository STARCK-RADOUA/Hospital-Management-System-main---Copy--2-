
import { Link } from "react-router-dom";
import Container from "./container";

const Home = () => {
  return (
    <>
      <Container className=" page-content flex flex-wrap ">
        <div className="flex items-center w-full lg:w-1/2">
          <div className="max-w-2xl mb-8">
            <h1 style={{color : "black"}} className="text-3xl font-bold leading-snug tracking-tight text-gray-800 lg:text-4xl lg:leading-tight xl:text-6xl xl:leading-tight dark:text-white">
            AL RAHMA IS YOUR MOST 
            </h1>
            <h1  style={{color : "black"}} className="text-3xl font-bold leading-snug tracking-tight text-gray-800 lg:text-4xl lg:leading-tight xl:text-6xl xl:leading-tight dark:text-white">
             TRUSTED HEALTH PARTNER
            </h1>
            <p className="py-5 text-xl leading-normal text-gray-500 lg:text-xl xl:text-2xl dark:text-gray-300">
              Nextly is a free landing page & marketing website
              template for startups and indie projects. Its built with
              Next.js & TailwindCSS. And its completely open-source.
            </p>

            <div className="flex flex-col items-start space-y-3 sm:space-x-4 sm:space-y-0 sm:items-center sm:flex-row">
              <Link id = "login" to="/login"
               
               
                className="px-8 py-4 text-lg font-medium text-center text-white bg-indigo-600 rounded-md ">
                Sign up 
              </Link>
              
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center w-full lg:w-1/2">
          <div className="">
            <img
              src="data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIzODUuODk3NDM1ODk3NDM1OCA5OTAgOTE5Ljg3MTc5NDg3MTc5NTEgODk5Ljk5OTk5OTk5OTk5OTgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbG5zOmJsdXNoPSJodHRwOi8vZGVzaWduLmJsdXNoIiBvdmVyZmxvdz0idmlzaWJsZSIgd2lkdGg9IjkxOS44NzE3OTQ4NzE3OTUxcHgiIGhlaWdodD0iODk5Ljk5OTk5OTk5OTk5OThweCI+PGRlZnM+PHBhdGggZD0iTTM0NiwxIEw0MDMsNDQgQzQ1NS4zMzA4MzcsNjAuNTkyNzA0MyA0OTguNDkzMzMsOTguMDQ3OTMyNSA1MjIuMjkzMDMxLDE0Ny41MTkyMjIgTDU3NCwyNTUgTDU3NCwyNTUgTDYxNywxNTkgTDY5MiwxOTMgTDYzOC4wMjU0MjgsMzE5Ljg4NzU5MSBDNjIwLjczMDg5OCwzNjAuNTQ0OTA2IDU3My43NTE2NDYsMzc5LjQ4NDE4NiA1MzMuMDk0MzMsMzYyLjE4OTY1NiBDNTE4LjAzMTAzLDM1NS43ODIxMzMgNTA1LjI5NTg3NywzNDQuOTA3OTMzIDQ5Ni42MDc0ODUsMzMxLjAzNDUzMyBMNDU0LDI2MyBMNDU0LDI2MyBMNDczLjU2NjYyLDUwMC41OTQ2NzMgQzQ3NC41MDc0NDgsNTEyLjAxOTAwNiA0NzIuNTk0NTg5LDUyMy40OTgwODEgNDY4LDUzNCBMNDY4LDUzNCBMNDY4LDUzNCBMMTIyLjI0MzUwMSw1MzQgQzY3LjAxNTAyNTYsNTM0IDIyLjI0MzUwMDYsNDg5LjIyODQ3NSAyMi4yNDM1MDA2LDQzNCBDMjIuMjQzNTAwNiw0MjcuMzQ0MjE1IDIyLjkwNzk4ODUsNDIwLjcwNTA1NyAyNC4yMjcwNzg4LDQxNC4xODEyOTUgTDY2LjY4ODI2NTcsMjA0LjE4MzAzNCBDODIuMzM5NjUyNiwxMjYuNzc2NzE4IDEzOC4yNzk0MTIsNjMuNjk3OTM2NCAyMTMuMjU5ODM5LDM4LjkwNjAyMDkgTDIxNiwzOCBMMjE2LDM4IEwyNzEsMCBMMzI0LjQ1NzE1LDUwLjYzNyBMMzQ2LDEgWiIgaWQ9Im1hc3RlcmNoYXJhY3RlcmJ1c3QtcGF0aC0xIi8+PC9kZWZzPjxnIGlkPSJNYXN0ZXIvQ2hhcmFjdGVyL0J1c3QiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGJsdXNoOmhhcy1jdXN0b21pemFibGUtY29sb3JzPSJ0cnVlIiBibHVzaDp2aWV3Qm94PSIzNzEuNTkzODMwMzM0MTkwMiA5MDkgNzAxLjc5OTQ4NTg2MTE4MjUgODkwLjk5OTk5OTk5OTk5OTgiIGJsdXNoOmk9IjAiPjxnIGlkPSJIZWFkIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSg1NjAuOTk5NjUwLCAxMDcyLjAwMDAwMCkiIGZpbGw9IiNmZmViODEiIGJsdXNoOmNvbG9yPSJTa2luLTUwMCIgYmx1c2g6aT0iMC4wIj48cGF0aCBkPSJNMTczLjQ5MzEsNjYuNDk5MjIxIEMxODIuMTA2MSwxMTAuNzU4MjIxIDE5Ny45MDMxLDE4NC43MjAyMjEgMTEyLjAwMDEsMTkwLjY0NTIyMSBDNDcuMzQ5MSwxOTUuMTAzMjIxIDM0LjEyMjEsMTMzLjMzNjIyMSAyOC4wMDAxLDk4LjY0NTIyMSBDMTkuMDAwMSw0Ny42NDUyMjEgMzYuMDAwMSwxMy42NDUyMjEgODQuMDAwMSwyLjY0NTIyMTAxIEMxNDkuMzU4MSwtMTIuMzMzNzc5IDE2OC4zMzkxLDQwLjAxNjIyMSAxNzMuNDkzMSw2Ni40OTkyMjEiIGJsdXNoOmk9IjAuMC4wIi8+PHBhdGggZD0iTTE0MCwyMTcgTDE0MCwxNzIgTDY2LDE3MiBMNjQsMjE0IEwtNi4zOTQ4ODQ2MmUtMTMsMjQ2LjY0NDcyMSBMMzcuMiwyNzkuOTY2NzIxIEM3OC4zMTgsMzE2Ljc5OTcyMSAxNDEuNTAzLDMxMy4zNDY3MjEgMTc4LjM2MywyNzIuMjUyNzIxIEwyMDEuMzMzLDI0Ni42NDQ3MjEgTDE0MCwyMTcgWiIgaWQ9Ik5lY2siIGJsdXNoOmk9IjAuMC4xIi8+PC9nPjxnIGlkPSJIYWlyIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSg0MDMuOTk5NjUwLCA4NzguMDAwMDAwKSBzY2FsZSgxIDEpIiBibHVzaDp3aWR0aD0iNTAwIiBibHVzaDpoZWlnaHQ9IjUwMCIgYmx1c2g6Y29tcG9uZW50PSJIYWlyIiBibHVzaDppPSIwLjEiIGJsdXNoOnZhbHVlPSJTbGljayIgYmx1c2g6dmlld0JveD0iMTI1IDExNy41IDM3NC45OTk5OTk5OTk5OTk5NCAyNzIuNDk5OTk5OTk5OTk5OTQiPjxnIGlkPSJIYWlyL1NsaWNrIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIiBibHVzaDp2aWV3Qm94PSIxMjUgMTE3LjUgMzc0Ljk5OTk5OTk5OTk5OTk0IDI3Mi40OTk5OTk5OTk5OTk5NCIgYmx1c2g6aT0iMC4xLjAiPjxwYXRoIGQ9Ik0xNjIuMTUwNzcyLDM2Ni40NzgxOTIgQzE0Ni4zMzgwMjEsMzU3Ljk5MjYyNSAxNDUuODI1OTI1LDMzNS41MTEzNjggMTYxLjIzNzY2NSwzMjYuMzE2MzU3IEwxMjcuNTkyNjYyLDIxOC45NDM5IEMxMTkuNzUwMTU5LDE5My45MTY4NjEgMTQyLjEwMjQwMywxNjkuODUyNDAxIDE2Ny42NTcxODcsMTc1LjgxMjE3MSBDMTY3LjY1NzE4NywxNzUuODEyMTcxIDE5MC4zMjkzNTEsNjQuNjYxNTY1OCAzNDkuMjkyMjE1LDE1MC41OTk3MjIgQzM5My44ODg5NTEsMTc0LjcwOTcwMiA0MjMuMDE1MDcyLDE3OC4zNTY4NDIgNDQxLjg0NDg1NSwxNzEuMTI2OTU3IEM0NzUuMzY1NDQ0LDE1OC4yNTM3MTkgNTA4LjkzMzc5OSwxOTAuNjMxNjYgNDk3LjgzNzY1OCwyMjQuNzY2IEM0ODIuNzg5MTYyLDI3MS4wNjMwMjQgNDMxLjk1ODQxNCwyOTkuODM4MjM0IDMwMS42MDQwMjIsMjYxLjgxNDcyMSBDMTk5LjY3MTk4NCwyMzIuMDgyMTQxIDI4NS45MTEyODYsMzkwIDIzMy45NTU2NDMsMzkwIEMyMTEuMzE4NTQ4LDM5MCAxODcuMzgzNTkxLDM4Mi4xNTkzOTcgMTYyLjE1MDc3MiwzNjYuNDc4MTkyIFoiIGlkPSJIYWlyIiBmaWxsPSIjZmZlYjgxIiBibHVzaDpjb2xvcj0iU2tpbi01MDAiIGJsdXNoOmk9IjAuMS4wLjAiLz48L2c+PC9nPjxnIGlkPSJGYWNlIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSg1OTIuOTk5NjUwLCAxMTIyLjAwMDAwMCkgc2NhbGUoMSAxKSIgZmlsbD0iIzAwMCIgYmx1c2g6d2lkdGg9IjE4MCIgYmx1c2g6aGVpZ2h0PSIxNTAiIGJsdXNoOmNvbXBvbmVudD0iRmFjZSIgYmx1c2g6aT0iMC4yIiBibHVzaDp2YWx1ZT0iU2xlZXB5IiBibHVzaDp2aWV3Qm94PSI3My44MDAwMDAwMDAwMDAwMSAxMS42MDA3MTk0MjQ0NjA0MzYgNzkuMTk5OTk5OTk5OTk5OTcgMTI5LjQ5NjQwMjg3NzY5Nzg4Ij48ZyBpZD0iRmFjZS9TbGVlcHkiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGJsdXNoOnZpZXdCb3g9IjczLjgwMDAwMDAwMDAwMDAxIDExLjYwMDcxOTQyNDQ2MDQzNiA3OS4xOTk5OTk5OTk5OTk5NyAxMjkuNDk2NDAyODc3Njk3ODgiIGJsdXNoOmk9IjAuMi4wIj48cGF0aCBkPSJNMTM4LjAwNzEzNCwxMy43NzAyMTM0IEwxNDUuODU3NDI2LDEyLjIyOTc4NjYgTDE0Ny41NDkwOTUsMjAuODc5NTY3NCBMMTQ4LjAxODI1MywyMy4zMzk2MDI4IEMxNTAuNjA5MzQ0LDM3LjA2NDQ3NzggMTUyLjEwMzA3OCw0Ny40NDIyOTIxIDE1Mi43MTkwMjQsNTcuODIwODM0OCBMMTUyLjc2MTUzLDU4LjU2MjIwNTcgQzE1My45ODQxMSw4MC42NjE0NzQ1IDE1MC42MDk3MDUsOTguNTk2MjQ1MiAxNDEuMDMxMjAyLDExMi41MDgzNDMgQzEyOS42NDY0MzEsMTI5LjA0MzkyIDExMC4wMzM2NSwxMzguNzg1OTg4IDgxLjE1MTA0NDYsMTQwLjkyODA5IEw4MC4yNzI5NzU3LDE0MC45OTA2NzUgTDc5LjcyNzAyNDMsMTMzLjAwOTMyNSBDMTA2LjgxMDY0OCwxMzEuMTU2NzE0IDEyNC40NDA1NSwxMjIuNDk3OTU4IDEzNC40NDE5NDksMTA3Ljk3MTYzMiBDMTQyLjg0NjU4Miw5NS43NjQ0OTcxIDE0NS45MDc0MTgsNzkuNDk2MzI2NSAxNDQuNzczNzQ0LDU5LjAwNDEwNzQgTDE0NC42ODkwODEsNTcuNTc4NjY1OSBDMTQ0LjA3MDUwOSw0Ny44MzE5MzU2IDE0Mi42Mjc3MjMsMzcuOTA4OTU1OCAxNDAuMTUzNDExLDI0LjgwNDEyOSBMMTM5LjMxMzIzOSwyMC40MjgzNTcgTDEzOC4wMDcxMzQsMTMuNzcwMjEzNCBaIiBpZD0iU3Ryb2tlLTkiIGZpbGw9IiMwMDAiIGZpbGwtcnVsZT0ibm9uemVybyIgYmx1c2g6aT0iMC4yLjAuMCIvPjxwYXRoIGQ9Ik0xMTIuMjAzMDAyLDI2LjEyMTE3MDQgQzExNC4zMzMwNjUsMjYuNjM1MzA3MyAxMTUuODIzMTE1LDI4Ljg3OTIzNDggMTE1LjEzNDI1MiwzMC44ODczMTQ2IEMxMTIuODE0OTE3LDM3LjY0ODMyNTIgMTE0LjA0ODQyMSw0MC43NDgxNDUzIDExNC41NTM1NCw0MS44NTU1ODk5IEMxMTQuODcwMzc5LDQyLjU0NzI3NDEgMTE1LjIzODAzOSw0Mi44MDUzMjA4IDExNi4yNjU1ODUsNDMuMDUzMjQ3NSBDMTE2LjM0MzkwNiw0My4wNzIwMjg2IDExNi40MzAyODQsNDMuMDg3MjQ0NCAxMTYuNTE1MzUxLDQzLjA5NTEyMjIgQzExOC4zMzUzMjksNDMuMjcyMDA1OCAxMjAuMjM5MjE4LDM5LjI4NTg3NzQgMTIyLjE3MjExOCwzMS4yODU3MzQxIEMxMjIuNjg0MDAzLDI5LjE2Nzc1MzkgMTI0LjgyNDcwOSwyNy44NjYzMzA1IDEyNi45NTgxMjEsMjguMzgwOTY0OSBDMTI5LjA4OTA1MiwyOC44OTM4Njk5IDEzMC40MDEwNywzMS4wMjgwODA2IDEyOS44ODkzNzIsMzMuMTQ3MTA5MSBDMTI4LjQ2NDE2MSwzOS4wNDgzNzggMTI1LjkyNjY1Miw0OS41NDc5OTEyIDExOC4zODQwNDksNTAuODYzMTU3MSBDMTE3LjU4NzQwNiw1MS4wMDE5MzE1IDExNi43MzU2NjksNTEuMDM4OTkwNyAxMTUuODI0NjAyLDUwLjk1NjY4MTYgQzExNS4zNjUyODYsNTAuOTE1NjQ1NSAxMTQuODkwODA2LDUwLjgzODMzOTkgMTE0LjQyMTkzLDUwLjcyNTQ2OTkgQzEwMi44NDg2ODMsNDcuOTMyOTQ4NSAxMDYuMjg3MjM2LDMzLjcwMjk4NzYgMTA3LjQxNjk5OCwyOS4wMjU5Mzk3IEMxMDcuOTI4ODgzLDI2LjkwNzk1OTQgMTEwLjA3Mjc1MSwyNS42MDU5ODUzIDExMi4yMDMwMDIsMjYuMTIxMTcwNCBaIE03OS44NDI3NjY2LDIyLjEwMDMwNjcgQzgxLjg1MDI3MzUsMjIuNTY1NzcxOSA4My4wODEzNzc1LDI0LjUyOTkzMDMgODIuNTg5MDUyNCwyNi40ODQ2NzI1IEM4MC41OTQ3NjAzLDM0LjQzNDkyNzggODEuNTI3NTA1NywzOC40MTg1MTc3IDgzLjMzODgwNTIsMzguODM4Mjg2MiBDODMuNDE5ODQyMywzOC44NTY5OTUzIDgzLjUwNDQ5MDMsMzguODcwNjk4MyA4My41ODU4MTc3LDM4Ljg3ODQxNDQgQzg1LjU1NTIwNiwzOS4wNDE5NDM3IDg4LjQ2ODc2NTIsMzQuMTAzNzQ4OSA4OS40NTE0MDY0LDI3LjI0ODkwODMgQzg5LjczNjI2ODUsMjUuMjU0ODA3MyA5MS42MjkzMjQ1LDIzLjg1NDgyODkgOTMuNjc0ODY0NSwyNC4xMjMyNjk1IEM5NS43MjIzOTkzLDI0LjM5MDI2ODMgOTcuMTQ5NDE5MSwyNi4yMjE4MTI0IDk2Ljg2NDE3ODEsMjguMjEzNzkwOSBDOTUuMTM2NzgwNyw0MC4yNTkyNjMyIDg5LjgzMDcxNDksNDUuMTk5NTYwNyA4NS4wNjQ3NjI3LDQ2LjAyOTkwMTUgQzg0LjMyMjEyNjcsNDYuMTU5MjY0NCA4My41OTMyMTcxLDQ2LjE4ODg2NjkgODIuODkyNTA2LDQ2LjEzMDM5NDEgQzgyLjQ0MDY2OTYsNDYuMDkwOTM0NCA4MS45OTcwMTQyLDQ2LjAyMTU5OTEgODEuNTY1OTA4NCw0NS45MjE2MjcgQzc3LjQ4NzE4NjEsNDQuOTc0NDM5NyA3MS4yNjA2NTYzLDQwLjk3MDk4NTkgNzUuMzE5NzM5NCwyNC43OTY2Njg3IEM3NS44MTA3ODMxLDIyLjg0MTA1NTUgNzcuODM3MjU0NSwyMS42MzMzOTk2IDc5Ljg0Mjc2NjYsMjIuMTAwMzA2NyBaIiBpZD0iRXllcyIgZmlsbD0iIzAwMCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTAyLjAwMDAwMCwgMzYuNTAwMDAwKSBzY2FsZSgtMSwgMSkgdHJhbnNsYXRlKC0xMDIuMDAwMDAwLCAtMzYuNTAwMDAwKSIgYmx1c2g6aT0iMC4yLjAuMSIvPjwvZz48L2c+PGcgaWQ9IlVwcGVyIEJvZHkgQnVzdCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTAwLjAwMDAwMCwgMTE2MC4wMDAwMDApIHNjYWxlKDEgMSkiIGJsdXNoOndpZHRoPSIxMjAwIiBibHVzaDpoZWlnaHQ9IjExODAiIGJsdXNoOmNvbXBvbmVudD0iVXBwZXIgQm9keSBCdXN0IiBibHVzaDppPSIwLjMiIGJsdXNoOnZhbHVlPSJTY3J1YnMgMiIgYmx1c2g6dmlld0JveD0iMjg4IDEyOC4zMTMwMDgxMzAwODEzNiA5MTEuOTk5OTk5OTk5OTk5OCA1OTMuNTk3NTYwOTc1NjA5NyI+PGcgaWQ9IlVwcGVyIEJvZHkgQnVzdC9TY3J1YnMgMiIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCIgYmx1c2g6dmlld0JveD0iMjg4IDEyOC4zMTMwMDgxMzAwODEzNiA5MTEuOTk5OTk5OTk5OTk5OCA1OTMuNTk3NTYwOTc1NjA5NyIgYmx1c2g6aT0iMC4zLjAiPjxnIGlkPSJHcm91cC0zNiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMjkyLjAwMDAwMCwgMTMwLjAwMDAwMCkiIGJsdXNoOmk9IjAuMy4wLjAiPjxwYXRoIGQ9Ik04NjkuNjc4Nzg0LDQ0NS45MjU3ODggTDg2OS42Nzg3ODQsNDQ1LjkyNTc4OCBDODcxLjU0NTIwNyw0NDEuNzMzOTE3IDg2OS43NTk0NjIsNDM2LjgxODc3MiA4NjUuNjM0MDY1LDQzNC43OTU1MjUgTDgyNC4yODQ5NzMsNDE0LjUwODk4NiBMODg0LjY2NTU1OCw0MjMuNzk5ODI0IEM4ODkuNjIwNjA5LDQyNC41NjI3NDcgODk0LjIzODUwMSw0MjEuMTI1Mzg5IDg5NC45MTY0MzQsNDE2LjE2OTM5NSBDODk1LjU0ODYwOSw0MTEuNTUxMDA4IDg5Mi41MjAxODcsNDA3LjIyMDk3MSA4ODcuOTU2NDgzLDQwNi4yMjEzNjIgTDgyOS4xODU4MzgsMzkzLjM0NDE4NSBMODk4LjA1NDQzMiwzOTAuMDA3NzUgQzkwMy42OTcwNSwzODkuNzMzODE4IDkwOC4xMDA2MDQsMzg1LjAzNjEzNiA5MDgsMzc5LjQwMTMyIEM5MDcuODk5NTEyLDM3NC4wMzIwMjUgOTAzLjczMTk3LDM2OS42MTU0ODMgODk4LjM2NjMwNSwzNjkuMTk0OTc1IEw4MjkuNTg4MDIyLDM2My43OTkyNDggTDg5MC41NjEwNDYsMzUwLjQ1NzEwOSBDODk1LjY1OTM5LDM0OS4zNDA5NTkgODk4LjkxNzgwMywzNDQuMzUxMzI0IDg5Ny44Nzg2MjcsMzM5LjI0NjM0OSBDODk2Ljk1MDIzMiwzMzQuNjg4MDM1IDg5Mi44NjA5NiwzMzEuNDYyMTMzIDg4OC4yMDIxMjgsMzMxLjYxNDcxOCBMODI0LjMxMzg3MiwzMzMuNjk2ODM2IEw4MjQuMzEzODcyLDMzMy42OTY4MzYgTDgwMi45ODYwNzgsMzM0LjM5MTI3NiBDODEyLjQ4MTk1NSwzMjQuNjg4MzQgODIxLjg3OTA5MywzMTMuOTAxNjkyIDgzMC4yNDkwOTcsMzAyLjI1ODQwOCBDODMyLjg0NTIzMSwyOTguNjQ4MDQxIDgzMi4zNTk5NjEsMjkzLjY3MDQyIDgyOS4xNzAxODQsMjkwLjU2ODI2OCBDODI2LjI1Mzc0OCwyODcuNzMxNjM3IDgyMS43OTk2MiwyODcuMTgzNzc0IDgxOC4yNzk5MDgsMjg5LjIyOTg0OSBMNzY3LjgxNjY1MSwzMTguNTc4OTUgQzc2MC4zMTQ4MzUsMzIyLjk0MTQyNiA3NTQuMTk4OTg5LDMyOS4xMjc3MDkgNzQ5LjkzMjcwNywzMzYuNDI0MTM1IEw3MTUuNzgzMTksMzI4LjA4ODQ1MiBMNzAzLDM5OC4yNzczNTMgTDgxMy4yMzgxNTgsNDM1LjE4NzE5OSBMODU5LjEzNDA5Nyw0NTAuNTU0OTg3IEM4NjMuMzE5NzAxLDQ1MS45NTU4ODIgODY3Ljg4NzAxOCw0NDkuOTUwNjU2IDg2OS42Nzg3ODQsNDQ1LjkyNTc4OCIgaWQ9IkhhbmQtQ29sb3IiIGZpbGw9IiNmZmViODEiIGJsdXNoOmNvbG9yPSJTa2luLTUwMCIgYmx1c2g6aT0iMC4zLjAuMC4wIi8+PHBhdGggZD0iTTgyOC4yODg4MDgsMzQ2LjMzNDM5NiBMODI5LjA4NzMyOCwzNTAuNjMwMTYgQzgyOS4xMzY4OTcsMzUwLjkxNjA2IDgyOS4xOTgzOTYsMzUxLjI4ODM0NCA4MjkuMjY5Mzk0LDM1MS43NDMxNCBMODI5LjM0MzQ2NywzNTIuMjI1Mjk1IEM4MjkuNTc1MjUsMzUzLjc1NzQxMyA4MjkuODA2MTQ1LDM1NS41MTQzMTcgODMwLjAyMTEyMiwzNTcuNDcyMjE5IEM4MzEuODE3MDYzLDM3My44Mjg3MzcgODMxLjQyNjA5MSwzOTEuNTY4Mjk0IDgyNy4yOTcwMTgsNDA4LjM1MzU0MiBDODI2LjE3MzE5OCw0MTIuOTIyMDIzIDgyNC43ODYyMjgsNDE3LjMwODA0MSA4MjMuMTE5MTEsNDIxLjQ4Nzc3NiBMODIyLjY5NjQ4NCw0MjIuNTI4Mzk5IEw4MjEuMTY4MDg1LDQyNi4yMjQ4ODMgTDgxMy43NzUxMTcsNDIzLjE2ODA4NSBMODE1LjMwMzUxNiw0MTkuNDcxNjAxIEM4MTcuMDAxMjY5LDQxNS4zNjU1MjYgODE4LjQwNDQyMSw0MTEuMDEyNTQ5IDgxOS41Mjg2MTEsNDA2LjQ0MjU2IEM4MjMuMzk5NzU4LDM5MC43MDU4MTkgODIzLjc3MTI2MywzNzMuODQ5NDk4IDgyMi4wNjg5MTUsMzU4LjM0NTM2OSBMODIxLjkzMTc5NiwzNTcuMTQzNDY2IEM4MjEuNzkyOTQsMzU1Ljk3MTQyNyA4MjEuNjQ5MzU3LDM1NC44ODk3ODUgODIxLjUwNTQzOCwzNTMuOTA1Nzc2IEw4MjEuNDMzNDcxLDM1My40MjE5NDEgQzgyMS4zNzM2NzksMzUzLjAyNjcwNyA4MjEuMzE3NTc5LDM1Mi42NzI4MzkgODIxLjI2NjEyMiwzNTIuMzYxODk3IEw4MjEuMTU3ODQ5LDM1MS43MzM0MTYgTDgyMC40MjQ0MzMsMzQ3LjgwMTIyOSBMODI4LjI4ODgwOCwzNDYuMzM0Mzk2IFogTTc5OS4wODg4ODQsMzI5LjkxMzA0OCBMODA3LjA4Njk1MiwzMzAuMDg4ODg0IEw4MDYuOTk5MDM0LDMzNC4wODc5MTggQzgwNi41NzgyODUsMzUzLjIyNjAzNyA4MDAuODUwNDgsMzY3Ljg5NjAyMyA3OTEuNTIxNjMxLDM3OC41NTQwMiBDNzg4LjA4NjIwNSwzODIuNDc4OTE1IDc4NC4zOTQzNzIsMzg1LjU3NzYwOSA3ODAuNjg0NTQyLDM4Ny45NDE2OCBDNzc5LjM2ODA5MywzODguNzgwNTggNzc4LjEzNTU0MywzODkuNDcwMjEzIDc3Ny4wMTU1MywzOTAuMDIyMjU5IEw3NzYuNTcwMTQyLDM5MC4yMzc0ODEgQzc3Ni4xNTA2MzIsMzkwLjQzNTkyMSA3NzUuODA5Njg3LDM5MC41ODQzOTEgNzc1LjU1NTY4LDM5MC42ODYyODUgTDc3MS43MDI1OTQsMzkyLjE2OTMyNSBMNzY4LjgzMDY3NSwzODQuNzAyNTk0IEw3NzIuNTY0MDQsMzgzLjI2NjYzNCBDNzcyLjY2NzQxOCwzODMuMjI2ODcyIDc3Mi45MjcyODMsMzgzLjExNDM3MiA3NzMuMzIzNjcyLDM4Mi45MjIzMiBMNzczLjQ3ODY3OSwzODIuODQ2NTU4IEM3NzQuMzQyNjk1LDM4Mi40MjA2OSA3NzUuMzIwOTIsMzgxLjg3MzM1NyA3NzYuMzg1MzA3LDM4MS4xOTUwODIgQzc3OS40Nzc4NjMsMzc5LjIyNDM2NiA3ODIuNTg4NDE4LDM3Ni42MTM1NjEgNzg1LjUwMTg4NiwzNzMuMjg0OTkgQzc5My40NzY0MjUsMzY0LjE3NDI2MiA3OTguNDcwOTM1LDM1MS41NTEyNDIgNzk4Ljk4MDg4MSwzMzQuNjgxODAyIEw3OTkuMDAwOTY2LDMzMy45MTIwODIgTDc5OS4wODg4ODQsMzI5LjkxMzA0OCBaIiBpZD0iQ29tYmluZWQtU2hhcGUiIGZpbGw9IiMwMDAiIGZpbGwtcnVsZT0ibm9uemVybyIgYmx1c2g6aT0iMC4zLjAuMC4xIi8+PHBhdGggZD0iTTE4MiwzOSBDMjI1LjMzMzMzMyw1NSAyNjEuMzMzMzMzLDYwLjY2NjY2NjcgMjkwLDU2IEMzMTguNjY2NjY3LDUxLjMzMzMzMzMgMzM1LjMzMzMzMywzOS42NjY2NjY3IDM0MCwyMSBMMzg3LDExMiBMMzQwLDE3OSBMMjA4LDE3OSBMMTgyLDM5IFoiIGlkPSJQYXRoLTIiIGZpbGw9IiNFRkVFRDgiIGJsdXNoOmk9IjAuMy4wLjAuMiIvPjxwYXRoIGQ9Ik01MzEsMTk4IEw0NzUuMzg5OCw5Mi43NzI2IEM0NjUuMTcwOCw3My4xODQ2IDQ0OC43NTE4LDU3LjUzMjYgNDI4LjY5ODgsNDguMjYwNiBMMzY1LjU1NTgsMjAuOTY0NiBMMzI0LjYwNzgsMC40NDc2IEwyOTksMTM0IEwxOTkuMjg1OCw2LjgyOTYgTDE2OC40OTk4LDIzLjE3MjYgTDE2OC41Mzc4LDIyLjkwODYgTDExMi44NDE4LDUyLjcxOTYgQzgzLjk2ODgsNjguMTcyNiA2MS40Mjc4LDkzLjI1ODYgNDkuMTM4OCwxMjMuNjEzNiBMMjAsMTk4IEwxNjMsNTEwIEw0MTguMzQxMTEyLDUxMCBDNDI3LjA0MzMyNCw1MTAgNDM0LjE0OTg5NCw1MDMuMDQ0OTM5IDQzNC4zMzczOTgsNDk0LjM0NDc0OCBMNDM5LDI3OCBMNDM5LDI3OCBMNTMxLDE5OCBaIiBpZD0iU2NydWJzLUNvbG9yIiBmaWxsPSIjNTJENkMwIiBibHVzaDppPSIwLjMuMC4wLjMiLz48cGF0aCBkPSJNMjY5Ljg2MTk2NywxNjggTDEzMi42NzE3NjUsMTY4IEwxNDIuMzAzMzQzLDI5MCBMMjYxLjMwMDU2NCwyOTAgTDI2OS44NjE5NjcsMTY4IFogTTI2MS4yODEsMTc2IEwyNTMuODQyLDI4MiBMMTQ5LjY5NiwyODIgTDE0MS4zMjgsMTc2IEwyNjEuMjgxLDE3NiBaIiBpZD0iUG9ja2V0IiBmaWxsPSIjMDAwIiBmaWxsLXJ1bGU9Im5vbnplcm8iIGJsdXNoOmk9IjAuMy4wLjAuNCIvPjxwb2x5Z29uIGlkPSJTdHJva2UtMTIiIGZpbGw9IiMwMDAiIGZpbGwtcnVsZT0ibm9uemVybyIgcG9pbnRzPSI0MjMgNTA1LjUgNDIzIDUxMy41IDE1OCA1MTMuNSAxNTggNTA1LjUiIGJsdXNoOmk9IjAuMy4wLjAuNSIvPjxwYXRoIGQ9Ik0yMCwxOTggTDExNSwyNzAgTDEwMSwzNTMgTDE5NCw1MTggTDEyNSw1ODQgTDQ5LjI1NjM0NTIsNDY4Ljk2NDMyNCBDLTMuMDk4MTY4NzYsMzg5LjQ1MDkwNiAtMTQuMjk4NTgxNiwyODkuNzY5NTIzIDE4Ljk3ODAwMTMsMjAwLjY5NTkyMSBMMjAsMTk4IFogTTUzMSwxOTggTDU0MS44Mzc4NjIsMjE1Ljc5MDQ1MyBDNTY4Ljg3ODE4LDI2MC4xNzczOSA2MTIuMTM1NzgyLDI5Mi4yOTQ0NjIgNjYyLjQ0NzIxOSwzMDUuMzM4MTY4IEw2NjIuNDQ3MjE5LDMwNS4zMzgxNjggTDc0NiwzMjcgTDcyMy4yODk4LDQyNi44NDE2IEM1ODAuNDI5OTMzLDQxMi4yODA1MzMgNDg1LjY2NjY2NywzNjIuNjY2NjY3IDQzOSwyNzggTDQzOSwyNzggTDUzMSwxOTggWiIgaWQ9IkZpbGwtOCIgZmlsbD0iI0VGRUVEOCIgYmx1c2g6aT0iMC4zLjAuMC42Ii8+PHBvbHlnb24gaWQ9IlBhdGgiIGZpbGw9IiMwMDAiIGZpbGwtcnVsZT0ibm9uemVybyIgcG9pbnRzPSIxOTguMjYwNzMzIDUwNi4wODUxMzkgMjAzLjczOTI2NyA1MTEuOTE0ODYxIDEyMC43MzkyNjcgNTg5LjkxNDg2MSAxMTUuMjYwNzMzIDU4NC4wODUxMzkiIGJsdXNoOmk9IjAuMy4wLjAuNyIvPjxwb2x5Z29uIGlkPSJTdHJva2UtMTAiIGZpbGw9IiMwMDAiIGZpbGwtcnVsZT0ibm9uemVybyIgcG9pbnRzPSIyMjcuMTc5MDcxIDM2LjU3MjM0NTYgMzExLjE3OTA3MSAxNDYuNTcyMzQ2IDMwNC44MjA5MjkgMTUxLjQyNzY1NCAyMjAuODIwOTI5IDQxLjQyNzY1NDQiIGJsdXNoOmk9IjAuMy4wLjAuOCIvPjxwb2x5Z29uIGlkPSJTdHJva2UtMzQiIGZpbGw9IiMwMDAiIGZpbGwtcnVsZT0ibm9uemVybyIgcG9pbnRzPSI0MzcuMDAxMjE5IDE3OC45MDEyNjUgNDQ0Ljk5ODc4MSAxNzkuMDk4NzM1IDQ0MC45OTg3ODEgMzQxLjA5ODczNSA0MzMuMDAxMjE5IDM0MC45MDEyNjUiIGJsdXNoOmk9IjAuMy4wLjAuOSIvPjwvZz48L2c+PC9nPjwvZz48L3N2Zz4="
              width="616"
              height="617"
              className={"object-cover"}
              alt="Hero Illustration"
              loading="eager"
              placeholder="blur"
            />
          </div>
        </div>
      </Container>
    
    </>
  );
}


export default Home;