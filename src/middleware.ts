// import { NextRequest, NextResponse } from "next/server";
// // import type { NextRequest, NextResponse } from "next/server";
// import { getCookie } from 'cookies-next';
// import {UserTypes} from "@/lib/constants"

// export function middleware(req: NextRequest, res: NextResponse) {
//   const account_type =  getCookie('account_type', { req, res });
//   const token =  getCookie('token', { req, res });

//   let redirect_path = ""

//   if(token && account_type){
//       if (account_type === UserTypes.ADMIN) { redirect_path = "/admin"}
//       else if (account_type === UserTypes.INSTRUCTOR) { redirect_path = "/instructor"}
//       else if (account_type === UserTypes.SUPER_ADMIN) { redirect_path = "/super-admin"}
//       else  { redirect_path = "/dashboard"}

//       return NextResponse.redirect(new URL(redirect_path, req.url), 302)
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: "/login",
// };


import { NextRequest, NextResponse } from "next/server";
// import type { NextRequest, NextResponse } from "next/server";
import { getCookie } from "cookies-next";
import { UserTypes } from "@/lib/constants";

export function middleware(req: NextRequest, res: NextResponse) {
  const account_type = getCookie("account_type", { req, res });
  const token = getCookie("token", { req, res });
  const isAuth = token && account_type


  function handleRouting(){
    let redirect_path = "";  

    if (account_type === UserTypes.ADMIN) {
        redirect_path = "/admin";
    } else if (account_type === UserTypes.INSTRUCTOR) {
      redirect_path = "/instructor";
    } else if (account_type === UserTypes.TRAINEE) {
      redirect_path = "/dashboard";
    }

    return NextResponse.redirect(new URL(redirect_path, req.url), 302);
  }

  if (req.nextUrl.pathname.startsWith('/dashboard') || req.nextUrl.pathname.startsWith('/admin') || req.nextUrl.pathname.startsWith('/getting-started') || req.nextUrl.pathname.startsWith('/super-admin')) {
    if(!isAuth){
        return NextResponse.redirect(new URL('/login', req.url), 302);
    }
  }

  if (req.nextUrl.pathname.startsWith('/login')) {
    if(isAuth){
      let redirect_path = "";  

      if (account_type === UserTypes.ADMIN) {
          redirect_path = "/admin";
      } else if (account_type === UserTypes.INSTRUCTOR) {
        redirect_path = "/instructor";
      } else if (account_type === UserTypes.TRAINEE) {
        redirect_path = "/dashboard";
      }else if (account_type === UserTypes.SUPER_ADMIN) {
        redirect_path = "/super-admin";
      }

      return NextResponse.redirect(new URL(redirect_path, req.url), 302);
    }
  }

  // req.nextUrl.pathname.startsWith('/dashboard')

  if (req.nextUrl.pathname.startsWith('/admin') && account_type !== UserTypes.ADMIN) {
      return NextResponse.redirect(new URL('/login', req.url), 302);
  }  
  if (req.nextUrl.pathname.startsWith('/dashboard') && account_type !== UserTypes.TRAINEE) {
      return NextResponse.redirect(new URL('/login', req.url), 302);
  }

  if (req.nextUrl.pathname.startsWith('/instructor') && account_type !== UserTypes.INSTRUCTOR) {
      return NextResponse.redirect(new URL('/login', req.url), 302);
  }

  if(req.nextUrl.pathname.startsWith('/super-admin') && account_type !== UserTypes.SUPER_ADMIN){
      return NextResponse.redirect(new URL('/login', req.url), 302);
  }

  if (req.nextUrl.pathname.startsWith('/getting-started') && account_type !== UserTypes.TRAINEE) {
      return NextResponse.redirect(new URL('/login', req.url), 302);
  }
  // if (token && account_type) {
  //   if (account_type === UserTypes.ADMIN) {
  //     redirect_path = "/admin";
  //   } else if (account_type === UserTypes.INSTRUCTOR) {
  //     redirect_path = "/instructor";
  //   } else if (account_type === UserTypes.SUPER_ADMIN) {
  //     redirect_path = "/super-admin";
  //   } else {
  //     redirect_path = "/dashboard";
  //   }

  //   return NextResponse.redirect(new URL(redirect_path, req.url), 302);
  // }

  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/dashboard/:path*", "/admin/:path*", '/getting-started'  ]
};
