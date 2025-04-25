var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
var _a, _b;
import { jsx, Fragment, jsxs } from "react/jsx-runtime";
import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable, json } from "@remix-run/node";
import { RemixServer, useLocation, useParams, useNavigate, Link as Link$1, Outlet, Meta, Links, ScrollRestoration, Scripts, useSearchParams } from "@remix-run/react";
import { isbot } from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import React, { useEffect, useState, useContext, createContext as createContext$1, useRef } from "react";
import { QueryClient, QueryClientProvider, useMutation } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import superjson from "superjson";
import { createTRPCReact as createTRPCReact$1 } from "@trpc/react-query";
import { Result, Button, Flex, Typography, Divider, Layout as Layout$1, Spin, theme, ConfigProvider, message, Menu, Avatar, Tag, Row, Col, Form, Input, Upload, Switch, InputNumber, List, Space, Table, Modal, Card, Alert, Select, Tabs, Tooltip, Empty } from "antd";
import { LoadingOutlined, TwitterCircleFilled, LinkedinFilled, ArrowRightOutlined, MenuOutlined, CloseOutlined, ArrowDownOutlined, CheckCircleFilled, StarFilled, StarOutlined, HomeOutlined, SettingOutlined, LogoutOutlined, PlusOutlined, EditOutlined, DeleteOutlined, YoutubeFilled, TikTokOutlined, FacebookFilled, CopyOutlined, UploadOutlined } from "@ant-design/icons";
import Posthog from "posthog-js";
import axios from "axios";
import dayjs from "dayjs";
import { ZodError, z } from "zod";
import { initTRPC, TRPCError } from "@trpc/server";
import { enhance, isPrismaClientKnownRequestError } from "@zenstackhq/runtime";
import Jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import cookie from "cookie";
import { v4 } from "uuid";
import { S3Client, PutObjectCommand, GetObjectCommand, HeadObjectCommand, ListBucketsCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import * as fs from "fs";
import * as os from "os";
import * as Path from "path";
import { join } from "path";
import { zfd } from "zod-form-data";
import passport from "passport";
import { config } from "dotenv";
import { Strategy } from "passport-google-oauth20";
import Bcrypt from "bcryptjs";
import Mailjet from "node-mailjet";
import * as NodemailerSDK from "nodemailer";
import sharp from "sharp";
import * as _Schema from "@zenstackhq/runtime/zod/input";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { toGeminiSchema } from "gemini-zod";
import OpenaiSDK from "openai";
import { zodResponseFormat } from "openai/helpers/zod";
import Flutterwave from "flutterwave-node-v3";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { twMerge } from "tailwind-merge";
import clsx$1, { clsx } from "clsx";
const ABORT_DELAY = 5e3;
function handleRequest$1(request, responseStatusCode, responseHeaders, remixContext, loadContext) {
  return isbot(request.headers.get("user-agent") || "") ? handleBotRequest(
    request,
    responseStatusCode,
    responseHeaders,
    remixContext
  ) : handleBrowserRequest(
    request,
    responseStatusCode,
    responseHeaders,
    remixContext
  );
}
function handleBotRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(
        RemixServer,
        {
          context: remixContext,
          url: request.url,
          abortDelay: ABORT_DELAY
        }
      ),
      {
        onAllReady() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
          pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}
function handleBrowserRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(
        RemixServer,
        {
          context: remixContext,
          url: request.url,
          abortDelay: ABORT_DELAY
        }
      ),
      {
        onShellReady() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
          pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}
const entryServer = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: handleRequest$1
}, Symbol.toStringTag, { value: "Module" }));
const restoreUrl = (route, params) => {
  let routeRestored = route;
  Object.entries(params).forEach(
    ([key, value]) => routeRestored = routeRestored.replace(value, `:${key}`)
  );
  return routeRestored;
};
const useMessageSend = (isActive = false) => {
  const pathname = useLocation().pathname;
  const params = useParams();
  useEffect(() => {
    if (!isActive) {
      return;
    }
    window.parent.postMessage({ type: "ready" }, "*");
  }, [isActive]);
  useEffect(() => {
    if (!isActive) {
      return;
    }
    const url = `${window.location.origin}${pathname}`;
    const pathPure = restoreUrl(pathname, params);
    window.parent.postMessage({ type: "navigation", url, pathPure }, "*");
  }, [isActive, pathname, params]);
};
const useMessageReceived = (isActive = false) => {
  const router = useNavigate();
  const handleMessage = (event) => {
    var _a2, _b2;
    const canContinue = ((_a2 = event == null ? void 0 : event.data) == null ? void 0 : _a2.type) === "navigation";
    if (canContinue) {
      const path = (_b2 = event.data.path) == null ? void 0 : _b2.trim();
      if (path && path !== "") {
        router(path);
      }
    }
  };
  useEffect(() => {
    if (!isActive) {
      return;
    }
    window.addEventListener("message", handleMessage);
    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, [isActive]);
};
const useWorkspace = () => {
  const [isSetup, setSetup] = useState(false);
  const isActive = false;
  useMessageSend(isActive);
  useMessageReceived(isActive);
  useEffect(() => {
  }, [isActive]);
  return {};
};
const WorkspaceProvider = ({ children }) => {
  useWorkspace();
  return /* @__PURE__ */ jsx(Fragment, { children });
};
function createTRPCReact(opts) {
  const r = createTRPCReact$1(opts);
  return r;
}
const Api = createTRPCReact();
const transformer = superjson;
const Provider$1 = ({ children }) => {
  const [queryClient] = useState(
    () => new QueryClient({
      defaultOptions: {
        queries: {
          retry: false
          // Disable retries globally for queries
        },
        mutations: {
          retry: false
          // Disable retries globally for mutations
        }
      }
    })
  );
  const [trpcClient] = useState(
    () => Api.createClient({
      transformer,
      links: [
        httpBatchLink({
          url: "/api/trpc"
        })
      ]
    })
  );
  return /* @__PURE__ */ jsx(Api.Provider, { client: trpcClient, queryClient, children: /* @__PURE__ */ jsx(QueryClientProvider, { client: queryClient, children }) });
};
const TrpcClient = {
  Provider: Provider$1
};
const UserContext = createContext$1(void 0);
const UserProvider = ({ children }) => {
  const {
    data: session,
    refetch,
    ...querySession
  } = Api.authentication.session.useQuery();
  const user = session == null ? void 0 : session.user;
  const checkRole = (roleNames) => {
    if (!(user == null ? void 0 : user.globalRole)) return false;
    const roles = Array.isArray(roleNames) ? roleNames : [roleNames];
    return roles.includes(user.globalRole);
  };
  const isLoading = querySession.isLoading;
  const isLoggedIn = !!(session == null ? void 0 : session.user);
  let status = "unauthenticated";
  if (isLoading) {
    status = "loading";
  } else if (isLoggedIn) {
    status = "authenticated";
  }
  return /* @__PURE__ */ jsx(
    UserContext.Provider,
    {
      value: {
        user: session == null ? void 0 : session.user,
        checkRole,
        refetch,
        authenticationStatus: status,
        isLoggedIn,
        isLoading
      },
      children
    }
  );
};
const useUserContext = () => {
  const context = useContext(UserContext);
  if (context === void 0) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    __publicField(this, "handleReload", () => {
      window.location.reload();
    });
    __publicField(this, "handleGoHome", () => {
      window.location.href = "/";
    });
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, errorInfo) {
    console.error("Error caught in ErrorBoundary: ", error, errorInfo);
  }
  render() {
    if (this.state.hasError && this.state.error) {
      return /* @__PURE__ */ jsx(
        Result,
        {
          status: "error",
          title: "Something went wrong in your code.",
          subTitle: "There was an unexpected error in the application. Check the details below for debugging.",
          style: { background: "white" },
          extra: /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsx(Button, { type: "primary", onClick: this.handleReload, children: "Reload Page" }),
            /* @__PURE__ */ jsx(Button, { type: "primary", onClick: this.handleGoHome, children: "Back Home" }),
            /* @__PURE__ */ jsxs(Flex, { vertical: true, className: "mt-5", style: { textAlign: "left" }, children: [
              /* @__PURE__ */ jsx(Typography.Title, { level: 5, children: "Error Message" }),
              /* @__PURE__ */ jsx("pre", { style: { whiteSpace: "pre-wrap" }, children: this.state.error.message }),
              /* @__PURE__ */ jsx(Divider, {}),
              /* @__PURE__ */ jsx(Typography.Title, { level: 5, children: "Stack Trace" }),
              /* @__PURE__ */ jsx("pre", { style: { whiteSpace: "pre-wrap" }, children: this.state.error.stack })
            ] })
          ] })
        }
      );
    }
    return this.props.children;
  }
}
const MrbSplashScreen = () => {
  const [isPageInitialised, setPageInitialised] = useState(false);
  const [hasError, setHasError] = useState(false);
  useEffect(() => {
    const initializeTimeout = setTimeout(() => {
      if (!isPageInitialised) {
        setHasError(true);
      }
    }, 5e3);
    try {
      setPageInitialised(true);
    } catch (error) {
      setHasError(true);
      console.error("Initialization failed:", error);
    }
    return () => clearTimeout(initializeTimeout);
  }, []);
  if (!isPageInitialised && !hasError) {
    return /* @__PURE__ */ jsx("div", {});
  }
  if (hasError) {
    return /* @__PURE__ */ jsx(
      Layout$1.Content,
      {
        style: {
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        },
        children: /* @__PURE__ */ jsx(
          Result,
          {
            status: "error",
            title: "Initialization Failed",
            subTitle: "The application failed to initialize. Please try again.",
            extra: [
              /* @__PURE__ */ jsx(
                Button,
                {
                  type: "primary",
                  onClick: () => window.location.reload(),
                  children: "Retry"
                },
                "reload"
              )
            ]
          }
        )
      }
    );
  }
  return /* @__PURE__ */ jsx(
    Layout$1.Content,
    {
      style: {
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      },
      children: /* @__PURE__ */ jsx(Spin, { indicator: /* @__PURE__ */ jsx(LoadingOutlined, { spin: true }), size: "large" })
    }
  );
};
const { useToken } = theme;
const MrbHtml = ({ children }) => {
  const [isLoading, setLoading] = useState(true);
  const { token } = useToken();
  useEffect(() => {
    if (isLoading) {
      setLoading(false);
      return;
    }
    document.documentElement.style.backgroundColor = token.colorBgBase;
    document.documentElement.style.color = token.colorTextBase;
    return () => {
      document.documentElement.style.backgroundColor = "";
      document.documentElement.style.color = "";
    };
  }, [isLoading]);
  return /* @__PURE__ */ jsx(Fragment, { children: isLoading ? /* @__PURE__ */ jsx(MrbSplashScreen, {}) : children });
};
const Logo = ({
  height = 50,
  isLabel = false,
  style,
  ...props
}) => {
  const router = useNavigate();
  const goTo = (url) => {
    router(url);
  };
  return /* @__PURE__ */ jsxs(Flex, { align: "center", gap: 10, onClick: () => goTo("/skillfeed"), children: [
    /* @__PURE__ */ jsx(
      "img",
      {
        src: "https://marblism-dashboard-api--production-public.s3.us-west-1.amazonaws.com/gDTGyB-skillaff-q0fm",
        ...props,
        alt: "Logo",
        height,
        style: {
          borderRadius: "5px",
          cursor: "pointer",
          objectFit: "contain",
          height: `${height}px`,
          ...style
        },
        onError: (event) => {
          const target = event.target;
          target.onerror = null;
          target.src = "https://i.imgur.com/2dcDGIE.png";
        }
      }
    ),
    isLabel && /* @__PURE__ */ jsx(Typography.Title, { level: 4, style: { margin: "0px" }, children: "SKILLFLOW" })
  ] });
};
const LandingFooter = ({ ...props }) => {
  const socials = [
    {
      name: "X",
      icon: /* @__PURE__ */ jsx(TwitterCircleFilled, {}),
      link: "https://twitter.com/"
    },
    {
      name: "LinkedIn",
      icon: /* @__PURE__ */ jsx(LinkedinFilled, {}),
      link: "https://linkedin.com/"
    }
  ];
  return /* @__PURE__ */ jsx("div", { className: "relative mt-16", ...props, children: /* @__PURE__ */ jsx("div", { className: "border-t border-neutral-100  dark:border-neutral-800 px-8 pt-20 pb-32 relative bg-white dark:bg-black", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto  flex sm:flex-row flex-col justify-between items-start ", children: [
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("div", { className: "mr-4  md:flex mb-4", children: /* @__PURE__ */ jsx(Logo, { height: 50, isLabel: true }) }),
      /* @__PURE__ */ jsx("div", { children: "Copyright © 2024" }),
      /* @__PURE__ */ jsx("div", { className: "mt-2", children: "All rights reserved" })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-3 gap-10 items-start mt-10 md:mt-0", children: /* @__PURE__ */ jsx("div", { className: "flex justify-center space-y-4 flex-col mt-4", children: socials.map((link) => /* @__PURE__ */ jsx(
      Link$1,
      {
        className: "transition-colors  text-xs sm:text-sm",
        to: link.link,
        children: link.name
      },
      link.name
    )) }) })
  ] }) }) });
};
const DesignSystemContext = createContext$1({
  isMobile: false,
  message: null,
  isLoading: true
});
const useDesignSystem = () => {
  return useContext(DesignSystemContext);
};
const ProviderGeneral = ({ children }) => {
  const [isLoading, setLoading] = useState(true);
  const [isMobile, setMobile] = useState(false);
  const isWindow = typeof window !== "undefined";
  const defaultTheme = {
    algorithm: theme.defaultAlgorithm,
    token: {
      colorPrimary: "black",
      colorTextBase: "black",
      colorLink: "black",
      colorBgBase: "white",
      colorBgContainer: "white"
    }
  };
  useEffect(() => {
    if (!isWindow) {
      return;
    }
    try {
      setMobile(window.innerWidth < 992);
      const handleResize = () => {
        setMobile(window.innerWidth < 992);
      };
      window.addEventListener("resize", handleResize);
      return () => {
        if (!isWindow) {
          return;
        }
        window.removeEventListener("resize", handleResize);
      };
    } catch (error) {
      console.error("Failed to initialize mobile detection:", error);
    }
  }, []);
  useEffect(() => {
    if (!isWindow) {
      return;
    }
    try {
      const setVhVariable = () => {
        document.documentElement.style.setProperty(
          "--100vh",
          `${window.innerHeight}px`
        );
      };
      setVhVariable();
      window.addEventListener("resize", setVhVariable);
      return () => window.removeEventListener("resize", setVhVariable);
    } catch (error) {
      console.error("Failed to initialize vh variable:", error);
    } finally {
      setLoading(false);
    }
  }, []);
  return /* @__PURE__ */ jsx(ConfigProvider, { theme: defaultTheme, children: /* @__PURE__ */ jsx(DesignSystemContext.Provider, { value: { isMobile, message, isLoading }, children }) });
};
const DesignSystemProvider = ({ children }) => {
  return /* @__PURE__ */ jsx(ErrorBoundary, { children: /* @__PURE__ */ jsx(ProviderGeneral, { children: /* @__PURE__ */ jsx(MrbHtml, { children }) }) });
};
const LandingButton = (props) => {
  const {
    href,
    block,
    size = "md",
    type = "primary",
    className,
    children,
    ...remainingProps
  } = props;
  const sizes = {
    lg: "px-5 py-2.5",
    md: "px-4 py-2",
    sm: "px-2 py-1"
  };
  const styles = {
    outline: "bg-white  hover:text-black dark:hover:text-black border-2 border-black hover:bg-gray-100 text-black dark:bg-black dark:text-white dark:border-white",
    primary: "bg-black text-white hover:text-white dark:hover:text-black  hover:bg-slate-800 border-2 border-transparent dark:bg-white dark:text-black dark:hover:bg-gray-200 ",
    inverted: "bg-white text-black hover:text-black dark:hover:text-black border-2 border-transparent hover:bg-gray-100 dark:bg-black dark:text-white",
    muted: "bg-gray-100 hover:text-black dark:hover:text-black hover:bg-gray-200 border-2 border-transparent text-black dark:bg-gray-700 dark:text-white"
  };
  return /* @__PURE__ */ jsx(
    "a",
    {
      href,
      ...remainingProps,
      className: twMerge(
        "rounded text-center transition focus-visible:ring-2 ring-offset-2 ring-gray-200",
        block && "w-full",
        sizes[size],
        styles[type],
        className
      ),
      children
    }
  );
};
var DesignSystemUtility;
((DesignSystemUtility2) => {
  function buildClassNames(...values) {
    return twMerge(clsx(values));
  }
  DesignSystemUtility2.buildClassNames = buildClassNames;
})(DesignSystemUtility || (DesignSystemUtility = {}));
function LandingNavBarItem({
  children,
  href,
  active,
  target,
  className
}) {
  const pathname = useLocation().pathname;
  return /* @__PURE__ */ jsx(
    Link$1,
    {
      to: href,
      className: DesignSystemUtility.buildClassNames(
        "text-lg flex items-center justify-center   leading-[110%] px-4 py-2 rounded-md hover:text-black dark:hover:text-white text-gray-500 dark:text-gray-400 ",
        (active || (pathname == null ? void 0 : pathname.includes(href))) && "text-black dark:text-white",
        className
      ),
      target,
      children
    }
  );
}
const LandingDesktopNavbar = ({ navItems }) => {
  const { isLoggedIn } = useUserContext();
  return /* @__PURE__ */ jsxs("div", { className: "w-full flex relative justify-between px-4 py-2 rounded-full bg-transparent transition duration-200", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-row gap-2 items-center", children: [
      /* @__PURE__ */ jsx(Logo, { isLabel: true, height: 40 }),
      /* @__PURE__ */ jsx("div", { className: "flex items-center gap-1.5 pl-8", children: navItems.map((item) => /* @__PURE__ */ jsx(
        LandingNavBarItem,
        {
          href: item.link,
          target: item.target,
          children: item.title
        },
        item.title
      )) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex space-x-2 items-center", children: [
      isLoggedIn && /* @__PURE__ */ jsxs(LandingButton, { size: "sm", href: "/skillfeed", children: [
        "Dashboard ",
        /* @__PURE__ */ jsx(ArrowRightOutlined, {})
      ] }),
      !isLoggedIn && /* @__PURE__ */ jsx(LandingButton, { size: "sm", href: "/login", children: "Get Started" })
    ] })
  ] });
};
const LandingMobileNavbar = ({ navItems }) => {
  const { isLoggedIn } = useUserContext();
  const [open, setOpen] = useState(false);
  return /* @__PURE__ */ jsxs("div", { className: "flex justify-between  items-center w-full rounded-full px-2.5 py-1.5 transition duration-200", children: [
    /* @__PURE__ */ jsx(Logo, { isLabel: true, height: 40 }),
    /* @__PURE__ */ jsx(
      MenuOutlined,
      {
        className: "text-black dark:text-white h-6 w-6",
        onClick: () => setOpen(!open)
      }
    ),
    open && /* @__PURE__ */ jsxs("div", { className: "fixed inset-0 bg-white dark:bg-black z-50 flex flex-col items-start justify-start space-y-10  pt-5  text-xl text-zinc-600  transition duration-200 hover:text-zinc-800", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between w-full px-5", children: [
        /* @__PURE__ */ jsx(Logo, { isLabel: true, height: 40 }),
        /* @__PURE__ */ jsx("div", { className: "flex items-center space-x-2", children: /* @__PURE__ */ jsx(
          CloseOutlined,
          {
            className: "h-8 w-8 text-black dark:text-white",
            onClick: () => setOpen(!open)
          }
        ) })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "flex flex-col items-start justify-start gap-[14px] px-8", children: navItems.map((navItem, idx) => /* @__PURE__ */ jsx(Fragment, { children: navItem.children && navItem.children.length > 0 ? /* @__PURE__ */ jsx(Fragment, { children: navItem.children.map((childNavItem, idx2) => /* @__PURE__ */ jsx(
        Link$1,
        {
          to: childNavItem.link,
          onClick: () => setOpen(false),
          className: "relative max-w-[15rem] text-left text-2xl",
          children: /* @__PURE__ */ jsx("span", { className: "block text-black", children: childNavItem.title })
        },
        `link=${idx2}`
      )) }) : /* @__PURE__ */ jsx(
        Link$1,
        {
          to: navItem.link,
          onClick: () => setOpen(false),
          className: "relative",
          children: /* @__PURE__ */ jsx("span", { className: "block text-[26px] text-black dark:text-white", children: navItem.title })
        },
        `link=${idx}`
      ) })) }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-row w-full items-start gap-2.5  px-8 py-4 ", children: [
        isLoggedIn && /* @__PURE__ */ jsxs(LandingButton, { size: "sm", href: "/skillfeed", children: [
          "Dashboard ",
          /* @__PURE__ */ jsx(ArrowRightOutlined, {})
        ] }),
        !isLoggedIn && /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx(LandingButton, { href: "/register", size: "sm", children: "Sign Up" }),
          /* @__PURE__ */ jsx(LandingButton, { href: "/login", size: "sm", children: "Login" })
        ] })
      ] })
    ] })
  ] });
};
const LandingNavBar = ({ navItems }) => {
  const { isMobile } = useDesignSystem();
  return /* @__PURE__ */ jsxs("div", { className: "max-w-7xl  pt-4 mx-auto inset-x-0 z-50 w-[95%] lg:w-full", children: [
    /* @__PURE__ */ jsx("div", { className: "hidden lg:block w-full", children: !isMobile && /* @__PURE__ */ jsx(LandingDesktopNavbar, { navItems }) }),
    /* @__PURE__ */ jsx("div", { className: "flex h-full w-full items-center", children: isMobile && /* @__PURE__ */ jsx(LandingMobileNavbar, { navItems }) })
  ] });
};
const LandingContainer = ({
  navItems,
  children,
  ...props
}) => {
  return /* @__PURE__ */ jsx("main", { ...props, children: /* @__PURE__ */ jsxs("div", { className: "bg-white text-black dark:bg-black dark:text-slate-200", children: [
    /* @__PURE__ */ jsx(LandingNavBar, { navItems }),
    children,
    /* @__PURE__ */ jsx(LandingFooter, {})
  ] }) });
};
const LandingCTA = ({
  title,
  subtitle,
  buttonText,
  buttonLink,
  className,
  ...props
}) => {
  return /* @__PURE__ */ jsx(
    "section",
    {
      className: DesignSystemUtility.buildClassNames("py-16 px-5", className),
      ...props,
      children: /* @__PURE__ */ jsx("div", { className: "max-w-7xl mx-auto ", children: /* @__PURE__ */ jsxs("div", { className: "bg-black p-8 md:px-20 md:py-20 mt-20 mx-auto max-w-5xl rounded-lg flex flex-col items-center text-center", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-white text-4xl lg:text-5xl font-bold lg:tracking-tight", children: title }),
        /* @__PURE__ */ jsx("p", { className: "text-slate-400 mt-4 text-lg md:text-xl", children: subtitle }),
        /* @__PURE__ */ jsx("div", { className: "flex mt-10", children: /* @__PURE__ */ jsx(LandingButton, { href: buttonLink ?? "/register", size: "lg", children: buttonText }) })
      ] }) })
    }
  );
};
const LandingFAQ = ({
  title,
  subtitle,
  questionAnswers,
  className,
  ...props
}) => {
  return /* @__PURE__ */ jsx(
    "section",
    {
      className: DesignSystemUtility.buildClassNames("py-16 px-5", className),
      ...props,
      children: /* @__PURE__ */ jsx("div", { className: "max-w-7xl mx-auto ", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row", children: [
        /* @__PURE__ */ jsxs("div", { className: "md:w-1/2", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-3xl lg:text-4xl font-bold lg:tracking-tight", children: title }),
          /* @__PURE__ */ jsx("p", { className: "text-lg mt-4 text-slate-600 dark:text-slate-400", children: subtitle })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "w-full md:w-1/2 max-w-xl mx-auto", children: /* @__PURE__ */ jsx("div", { className: "grid divide-y divide-neutral-200 dark:divide-slate-400", children: questionAnswers.map((item, index) => /* @__PURE__ */ jsx("div", { className: "py-5", children: /* @__PURE__ */ jsxs("details", { className: "group", children: [
          /* @__PURE__ */ jsxs("summary", { className: "flex justify-between text-lg items-center font-medium cursor-pointer list-none", children: [
            /* @__PURE__ */ jsx("span", { children: item.question }),
            /* @__PURE__ */ jsx("span", { className: "transition group-open:rotate-180", children: /* @__PURE__ */ jsx(ArrowRightOutlined, {}) })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-slate-600 dark:text-slate-400 mt-3 group-open:animate-fadeIn", children: item.answer })
        ] }) }, index)) }) })
      ] }) })
    }
  );
};
const LandingFeatures = ({
  title,
  subtitle,
  features,
  className,
  ...props
}) => {
  return /* @__PURE__ */ jsx(
    "section",
    {
      className: DesignSystemUtility.buildClassNames("py-16 px-5", className),
      ...props,
      children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto ", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-4xl lg:text-5xl font-bold lg:tracking-tight", children: title }),
        /* @__PURE__ */ jsx("p", { className: "text-lg mt-4 text-slate-600 dark:text-slate-400", children: subtitle }),
        /* @__PURE__ */ jsx("div", { className: "grid sm:grid-cols-2 md:grid-cols-3 mt-16 gap-16", children: features.map((item, idx) => /* @__PURE__ */ jsxs("div", { className: "flex  gap-4 items-start", children: [
          /* @__PURE__ */ jsx("div", { className: " bg-black dark:bg-slate-800 rounded-full flex justify-center items-center w-8 h-8 text-white text-lg", children: item.icon }),
          /* @__PURE__ */ jsxs("div", { className: "flex-1 ", children: [
            /* @__PURE__ */ jsx("h3", { className: "font-semibold text-lg", children: item.heading }),
            " ",
            /* @__PURE__ */ jsx("p", { className: "text-slate-600 dark:text-slate-400 mt-2 leading-relaxed", children: item.description })
          ] })
        ] }, idx + "feature")) })
      ] })
    }
  );
};
const LandingHero = ({
  title,
  subtitle,
  buttonText,
  pictureUrl,
  socialProof = "",
  className,
  ...props
}) => {
  return /* @__PURE__ */ jsx(
    "section",
    {
      className: DesignSystemUtility.buildClassNames("", className),
      ...props,
      children: /* @__PURE__ */ jsxs("div", { className: "py-8 lg:py-44 px-5  max-w-7xl mx-auto  grid lg:grid-cols-2 place-items-center relative", children: [
        /* @__PURE__ */ jsxs("div", { className: "relative z-10 p-4 md:p-0", children: [
          /* @__PURE__ */ jsx("h1", { className: "text-4xl lg:text-5xl xl:text-6xl font-bold lg:tracking-tight xl:tracking-tighter", children: title }),
          /* @__PURE__ */ jsx("p", { className: "text-lg mt-4 text-slate-600 dark:text-slate-400 max-w-xl", children: subtitle }),
          /* @__PURE__ */ jsx("div", { className: "mt-6 flex flex-col sm:flex-row gap-3", children: /* @__PURE__ */ jsx(
            LandingButton,
            {
              href: "/login",
              className: "flex gap-1 items-center justify-center ",
              rel: "noopener",
              size: "lg",
              children: buttonText
            }
          ) }),
          socialProof && /* @__PURE__ */ jsx("div", { className: "mt-6", children: socialProof })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "lg:absolute right-0 top-0 w-4/5 lg:w-1/2 h-full", children: /* @__PURE__ */ jsx(
          "img",
          {
            src: pictureUrl,
            className: "mask-stripes object-cover w-full h-full",
            alt: "Landing cover"
          }
        ) })
      ] })
    }
  );
};
const LandingHowItWorks = ({
  title,
  subtitle = "",
  steps,
  className,
  ...props
}) => {
  return /* @__PURE__ */ jsx(
    "section",
    {
      className: DesignSystemUtility.buildClassNames("py-16 px-5", className),
      ...props,
      children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto text-center", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-4xl lg:text-5xl font-bold lg:tracking-tight", children: title }),
        /* @__PURE__ */ jsx("div", { className: "max-w-xl space-y-8 mt-12 mx-auto", children: steps.map((item, idx) => /* @__PURE__ */ jsxs("div", { className: "flex items-start", children: [
          /* @__PURE__ */ jsx("div", { className: "flex-shrink-0 w-16 h-16 bg-gray-200 dark:bg-slate-800 rounded-full flex items-center justify-center text-2xl font-bold ", children: idx + 1 }),
          /* @__PURE__ */ jsxs("div", { className: "ml-4 text-left", children: [
            /* @__PURE__ */ jsx("h3", { className: "font-semibold text-lg ", children: item.heading }),
            /* @__PURE__ */ jsx("p", { className: "dark:text-slate-400", children: item.description })
          ] })
        ] }, idx)) })
      ] })
    }
  );
};
const RightArrow = "data:image/svg+xml,%3c?xml%20version='1.0'%20encoding='iso-8859-1'?%3e%3c!--%20Uploaded%20to:%20SVG%20Repo,%20www.svgrepo.com,%20Generator:%20SVG%20Repo%20Mixer%20Tools%20--%3e%3c!DOCTYPE%20svg%20PUBLIC%20'-//W3C//DTD%20SVG%201.1//EN'%20'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'%3e%3csvg%20fill='%23A2A8B5'%20version='1.1'%20id='Capa_1'%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%20width='800px'%20height='800px'%20viewBox='0%200%20403.963%20403.963'%20xml:space='preserve'%3e%3cg%3e%3cpath%20d='M399.908,160.269c-31.824-15.3-64.26-28.152-89.964-52.632c-5.508-4.896-12.24-1.224-12.853,5.508%20c-1.836,15.3-2.448,29.988-2.448,44.676c-29.375-9.18-69.155-3.06-97.308-5.508c-59.976-4.284-119.952-17.748-179.928-15.912%20c-5.508,0-9.792,6.732-6.732,11.628c15.912,23.868,36.108,43.452,55.08,64.26c-20.196,25.093-44.064,45.9-63.648,71.604%20c-4.284,5.508-1.836,13.464,5.508,14.076c103.428,7.956,194.616-64.872,293.76-82.009c-1.836,18.36-1.224,36.721-0.612,55.08%20c0,6.12,7.956,9.792,12.853,5.509c33.048-33.049,63.647-67.32,89.964-105.876C404.804,167.001,402.968,162.105,399.908,160.269z%20M23.528,282.668c17.136-20.195,35.496-40.392,48.96-63.035c3.672,0.611,7.956-3.673,5.508-7.956%20c-14.076-20.809-31.212-39.168-46.512-59.364c47.736,0.612,94.86,9.18,142.596,14.076c43.452,4.896,89.352,7.344,133.416,8.568%20c5.508,0,7.344-7.344,3.06-10.404c-0.611-0.612-1.224-0.612-1.836-1.224c0-12.24,0.612-24.48,1.836-36.108%20c22.645,17.748,48.349,29.376,74.664,41.616c-21.42,29.988-45.288,57.528-70.38,83.844c-0.612-15.301-1.836-30.601-1.224-45.9%20c0-3.672-3.061-5.508-6.12-5.508c-1.224-1.836-3.06-3.06-6.12-2.448C204.68,209.841,120.836,281.445,23.528,282.668z'/%3e%3c/g%3e%3c/svg%3e";
const LandingPainPoints = ({
  title,
  subtitle,
  painPoints,
  className,
  ...props
}) => {
  return /* @__PURE__ */ jsx(
    "section",
    {
      className: DesignSystemUtility.buildClassNames("py-16 px-5", className),
      ...props,
      children: /* @__PURE__ */ jsxs("div", { className: "max-w-5xl mx-auto text-center", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-4xl lg:text-5xl font-bold lg:tracking-tight", children: title }),
        /* @__PURE__ */ jsx("h3", { className: "text-2xl mt-4 text-slate-600 dark:text-slate-400 mb-12", children: subtitle }),
        /* @__PURE__ */ jsx("div", { className: "md:flex justify-center items-center md:space-x-8", children: painPoints == null ? void 0 : painPoints.map((painPoint, idx) => /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center", children: [
            /* @__PURE__ */ jsx("span", { className: "text-5xl mb-4", children: painPoint.emoji }),
            /* @__PURE__ */ jsx("span", { className: "font-semibold text-lg text-gray-900 dark:text-slate-200", children: painPoint.title })
          ] }) }, idx),
          idx < painPoints.length - 1 && /* @__PURE__ */ jsx("center", { children: /* @__PURE__ */ jsx(
            "img",
            {
              src: RightArrow,
              width: "50",
              alt: "arrow",
              className: "dark:invert rotate-90 md:rotate-0 mt-5 mb-5 md:mt-0 md:mb-0"
            }
          ) })
        ] })) }),
        /* @__PURE__ */ jsx("div", { className: "text-center pt-20", children: /* @__PURE__ */ jsx("div", { className: "flex flex-col items-center", children: /* @__PURE__ */ jsxs("p", { className: "text-slate-600 dark:text-slate-400 text-lg", children: [
          /* @__PURE__ */ jsx(ArrowDownOutlined, {}),
          " there is an easier way"
        ] }) }) })
      ] })
    }
  );
};
const LandingPricing = ({
  title,
  subtitle,
  packages,
  className,
  ...props
}) => {
  return /* @__PURE__ */ jsx(
    "section",
    {
      className: DesignSystemUtility.buildClassNames("py-16 px-5", className),
      ...props,
      children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto relative group overflow-hidden text-center", children: [
        /* @__PURE__ */ jsxs("div", { className: "mt-16 md:mt-0", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-4xl lg:text-5xl font-bold lg:tracking-tight", children: title }),
          /* @__PURE__ */ jsx("p", { className: "text-lg mt-4 text-slate-600 dark:text-slate-400", children: subtitle })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-3 gap-10 mx-auto max-w-screen-lg mt-12", children: packages.map((item, idx) => /* @__PURE__ */ jsx(PricingCard, { ...item }, idx + "pricingcard")) })
      ] })
    }
  );
};
const PricingCard = (props) => {
  const { title, description, monthly, features, className, type, highlight } = props;
  return /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs(
    "div",
    {
      className: `flex flex-col w-full order-first lg:order-none border py-5 px-6 relative rounded-lg ${highlight ? "border-orange-500 " : "border-slate-400 "}`,
      children: [
        /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
          highlight && /* @__PURE__ */ jsx("span", { className: "inline-flex absolute px-3 py-1 text-xs -top-3 left-1/2 -translate-x-1/2 font-medium rounded-full bg-gradient-to-r from-red-500 to-orange-500 text-white ", children: "Popular" }),
          /* @__PURE__ */ jsx("h4", { className: "text-lg font-medium text-slate-600 dark:text-slate-400", children: title }),
          /* @__PURE__ */ jsxs("p", { className: "mt-3 text-4xl font-bold text-black dark:text-white md:text-4xl", children: [
            /* @__PURE__ */ jsx("span", { className: "text-sm font-normal", children: "XAF" }),
            monthly,
            /* @__PURE__ */ jsx("span", { className: "text-sm font-normal text-slate-600 dark:text-slate-400", children: "/month" })
          ] })
        ] }),
        /* @__PURE__ */ jsx("ul", { className: "grid mt-8 text-left gap-y-4", children: features.map((item, idx) => /* @__PURE__ */ jsxs(
          "li",
          {
            className: "flex items-start gap-3 text-slate-600 dark:text-slate-400",
            children: [
              /* @__PURE__ */ jsx(CheckCircleFilled, { className: "w-6 h-6" }),
              /* @__PURE__ */ jsx("span", { children: item })
            ]
          },
          idx + "pricingfeature"
        )) }),
        /* @__PURE__ */ jsx("div", { className: "flex mt-8", children: /* @__PURE__ */ jsx(
          LandingButton,
          {
            href: "/register",
            block: true,
            type: highlight ? "primary" : "outline",
            children: "Get Started"
          }
        ) })
      ]
    }
  ) });
};
const LandingSocialProof = () => {
  const socialProofImages = [
    { url: "https://i.imgur.com/afwBIFK.png" },
    { url: "https://i.imgur.com/LlloOPa.png" },
    { url: "https://i.imgur.com/j8jPb4H.png" },
    { url: "https://i.imgur.com/mJ1sZFv.png" }
  ];
  return /* @__PURE__ */ jsx("section", { className: "py-16", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto", children: [
    /* @__PURE__ */ jsx("h2", { className: "text-center  text-slate-600 dark:text-slate-400", children: "Featured on" }),
    /* @__PURE__ */ jsx("div", { className: "flex gap-8 md:gap-20 items-center justify-center mt-8 flex-wrap", children: socialProofImages.map((socialProofImage, idx) => /* @__PURE__ */ jsx(
      "img",
      {
        className: "h-6 md:h-10",
        src: socialProofImage.url,
        alt: "landing social logo"
      },
      `logo-${idx}`
    )) })
  ] }) });
};
const LandingAvatar = ({
  className,
  src,
  width = 128,
  height = 128,
  size = "medium",
  ...remainingProps
}) => {
  return /* @__PURE__ */ jsx(
    "img",
    {
      src,
      width,
      height,
      className: clsx$1(
        "rounded-full border-2 border-solid border-primary-100",
        size === "small" ? "w-6 h-6" : "",
        size === "medium" ? "h-9 w-9" : "",
        size === "large" ? "h-16 w-16" : "",
        className
      ),
      ...remainingProps,
      alt: "Landing avatar"
    }
  );
};
const LandingRating = ({
  className,
  rating = 5,
  maxRating = 5,
  size = "medium"
}) => {
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: clsx$1("flex items-center gap-1", className),
      "aria-describedby": `Rating: ${rating} out of ${maxRating}`,
      children: Array.from({ length: maxRating }).map((_, index) => {
        return /* @__PURE__ */ jsx(
          "div",
          {
            className: clsx$1(
              size === "small" ? "h-3 w-3" : "",
              size === "medium" ? "h-4 w-4" : "",
              size === "large" ? "h-5 w-5" : ""
            ),
            // Return half star for half ratings
            children: rating % 1 !== 0 && index === Math.floor(rating) && index + 1 === Math.ceil(rating) ? /* @__PURE__ */ jsxs("div", { className: "relative", children: [
              /* @__PURE__ */ jsx(
                StarFilled,
                {
                  className: "absolute top-0 left-0 w-full h-full text-gray-300 fill-gray-300",
                  "aria-hidden": "true"
                }
              ),
              /* @__PURE__ */ jsx(
                StarOutlined,
                {
                  className: "relative z-10 w-full h-full text-yellow-400 fill-yellow-400",
                  "aria-hidden": "true"
                }
              )
            ] }, index) : /* @__PURE__ */ jsx(
              StarFilled,
              {
                className: clsx$1("w-full h-full", {
                  "text-yellow-400 fill-yellow-400": index < rating,
                  "text-gray-300 fill-gray-300": index >= rating
                }),
                "aria-hidden": "true"
              },
              index
            )
          },
          index
        );
      })
    }
  );
};
const LandingSocialRating = ({
  children,
  numberOfUsers = 100,
  suffixText = "happy users"
}) => {
  const numberText = numberOfUsers > 1e3 ? `${(numberOfUsers / 1e3).toFixed(0)}k` : `${numberOfUsers}`;
  const avatarItems = [
    {
      src: "https://randomuser.me/api/portraits/men/51.jpg"
    },
    {
      src: "https://randomuser.me/api/portraits/women/9.jpg"
    },
    {
      src: "https://randomuser.me/api/portraits/women/52.jpg"
    },
    {
      src: "https://randomuser.me/api/portraits/men/5.jpg"
    },
    {
      src: "https://randomuser.me/api/portraits/men/4.jpg"
    }
  ];
  return /* @__PURE__ */ jsxs("div", { className: "group flex flex-wrap gap-2", children: [
    /* @__PURE__ */ jsx("div", { className: "flex gap-1", children: avatarItems.map((avatarItem, index) => /* @__PURE__ */ jsx(
      LandingAvatar,
      {
        src: avatarItem.src,
        className: clsx$1(
          "relative",
          index === 1 || index === 2 ? `-ml-4` : "",
          index === 3 ? `-ml-5` : "",
          index > 3 ? `-ml-6` : ""
        )
      },
      index
    )) }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col justify-center gap-1", children: [
      /* @__PURE__ */ jsx(LandingRating, {}),
      !children ? /* @__PURE__ */ jsxs("p", { className: "text-xs max-w-sm text-slate-600 dark:text-slate-400 ", children: [
        numberText,
        "+ ",
        suffixText
      ] }) : children
    ] })
  ] });
};
const LandingTestimonials = ({
  title,
  subtitle,
  testimonials,
  className,
  ...props
}) => {
  return /* @__PURE__ */ jsx(
    "section",
    {
      className: DesignSystemUtility.buildClassNames("py-16 px-5", className),
      ...props,
      children: /* @__PURE__ */ jsxs("div", { className: "max-w-5xl mx-auto px-4 py-16 relative group overflow-hidden", children: [
        /* @__PURE__ */ jsxs("div", { className: "mt-16 md:mt-0 text-center", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-4xl lg:text-5xl font-bold lg:tracking-tight", children: title }),
          /* @__PURE__ */ jsx("p", { className: "text-lg mt-4 text-slate-600 dark:text-slate-400", children: subtitle })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "mt-8 [column-fill:_balance] sm:columns-2 sm:gap-6 lg:columns-3 lg:gap-8", children: testimonials.map((testimonial, idx) => /* @__PURE__ */ jsx(TestimonialCard, { ...testimonial }, `testimonial-${idx}`)) })
      ] })
    }
  );
};
const TestimonialCard = ({
  name,
  content,
  designation,
  avatar
}) => {
  return /* @__PURE__ */ jsx("div", { className: "mb-8 sm:break-inside-avoid", children: /* @__PURE__ */ jsxs("blockquote", { className: "rounded-lg bg-gray-50 dark:bg-slate-800 p-6 shadow-sm sm:p-8", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
      /* @__PURE__ */ jsx(
        "img",
        {
          alt: "",
          src: avatar,
          className: "size-14 rounded-full object-cover"
        }
      ),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("p", { className: "mt-0.5 text-lg font-medium text-gray-900 dark:text-slate-300", children: name }),
        /* @__PURE__ */ jsx("p", { className: "flex gap-0.5 text-gray-800 dark:text-slate-400", children: designation })
      ] })
    ] }),
    /* @__PURE__ */ jsx("p", { className: "mt-4 text-gray-700 dark:text-slate-400", children: content })
  ] }) });
};
const Theme = {
  algorithm: theme.defaultAlgorithm,
  components: {
    Layout: {
      siderBg: "#ffffff",
      siderBorderRight: "1px solid #f0f0f0",
      headerBg: "#ffffff",
      headerBorderBottom: "1px solid #f0f0f0"
    }
  }
};
const Leftbar = ({
  keySelected,
  items,
  itemsBottom
}) => {
  var _a2, _b2, _c, _d;
  const { isMobile } = useDesignSystem();
  if (isMobile || items.length === 0) {
    return /* @__PURE__ */ jsx(Fragment, {});
  }
  return /* @__PURE__ */ jsxs(
    Flex,
    {
      vertical: true,
      justify: "space-between",
      className: "py-4",
      style: {
        width: "250px",
        backgroundColor: (_b2 = (_a2 = Theme.components) == null ? void 0 : _a2.Layout) == null ? void 0 : _b2.siderBg,
        borderRight: (_d = (_c = Theme.components) == null ? void 0 : _c.Layout) == null ? void 0 : _d.siderBorderRight
      },
      children: [
        /* @__PURE__ */ jsx(
          Menu,
          {
            mode: "inline",
            inlineIndent: 16,
            items,
            selectedKeys: [keySelected],
            style: { width: "100%" }
          }
        ),
        /* @__PURE__ */ jsx(
          Menu,
          {
            mode: "inline",
            inlineIndent: 16,
            items: itemsBottom,
            selectedKeys: [keySelected],
            style: { width: "100%" }
          }
        )
      ]
    }
  );
};
var Utility;
((Utility2) => {
  function sleep(milliseconds) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, milliseconds);
    });
  }
  Utility2.sleep = sleep;
  function isNull(value) {
    return value === null || value === void 0 || typeof value === "string" && value === "";
  }
  Utility2.isNull = isNull;
  function getUUID() {
    return v4();
  }
  Utility2.getUUID = getUUID;
  function isDefined(value) {
    const isEmptyString = typeof value === "string" && value === "";
    return value !== null && value !== void 0 && !isEmptyString;
  }
  Utility2.isDefined = isDefined;
  function openInNewTab(window2, url) {
    window2.open(url, "_blank");
  }
  Utility2.openInNewTab = openInNewTab;
  function sortByString(items, key) {
    return items.sort(
      (a, b) => a[key].localeCompare(b[key])
    );
  }
  Utility2.sortByString = sortByString;
  function removeTrailingSlash(content) {
    const REGEX_SLASH = /\/$/g;
    return content.replace(REGEX_SLASH, "");
  }
  Utility2.removeTrailingSlash = removeTrailingSlash;
  function stringToInitials(content) {
    var _a2;
    if (isNull(content)) {
      return "";
    }
    const words = content.trim().split(" ");
    const isOneWord = words.length === 1;
    if (isOneWord) {
      return (_a2 = words[0].slice(0, 2)) == null ? void 0 : _a2.toUpperCase();
    }
    return `${words[0][0]}${words[1][0]}`.toUpperCase();
  }
  Utility2.stringToInitials = stringToInitials;
  function debounce(func, delay) {
    let timeoutId;
    return function(...args) {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(() => {
        func(...args);
      }, delay);
    };
  }
  Utility2.debounce = debounce;
})(Utility || (Utility = {}));
const Mobilebar = ({ keySelected, items }) => {
  var _a2, _b2, _c, _d;
  const router = useNavigate();
  const { user, checkRole } = useUserContext();
  const { isMobile } = useDesignSystem();
  if (!isMobile) {
    return /* @__PURE__ */ jsx(Fragment, {});
  }
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs(
    Flex,
    {
      align: "center",
      justify: "space-between",
      className: "px-2",
      style: {
        position: "relative",
        backgroundColor: (_b2 = (_a2 = Theme.components) == null ? void 0 : _a2.Layout) == null ? void 0 : _b2.headerBg,
        borderBottom: (_d = (_c = Theme.components) == null ? void 0 : _c.Layout) == null ? void 0 : _d.headerBorderBottom
      },
      children: [
        /* @__PURE__ */ jsxs(Flex, { align: "center", children: [
          user && /* @__PURE__ */ jsx(Flex, { children: /* @__PURE__ */ jsx(
            Avatar,
            {
              src: user.pictureUrl,
              alt: user.name,
              size: "small",
              onClick: () => router("/profile"),
              style: { cursor: "pointer" },
              children: Utility.stringToInitials(user.name)
            }
          ) }),
          /* @__PURE__ */ jsx(
            Flex,
            {
              align: "center",
              justify: "center",
              style: {
                position: "absolute",
                left: 0,
                right: 0,
                top: 0,
                bottom: 0
              },
              children: /* @__PURE__ */ jsx(Logo, { height: 40 })
            }
          )
        ] }),
        /* @__PURE__ */ jsxs(Flex, { align: "center", children: [
          checkRole("ADMIN") && /* @__PURE__ */ jsx(Tag, { color: "red", bordered: false, children: "Admin" }),
          /* @__PURE__ */ jsx(
            Menu,
            {
              mode: "horizontal",
              items,
              selectedKeys: [keySelected],
              style: { width: 46 },
              overflowedIndicator: /* @__PURE__ */ jsx(MenuOutlined, {})
            }
          )
        ] })
      ]
    }
  ) });
};
const Topbar = ({ keySelected, items }) => {
  var _a2, _b2, _c, _d;
  const router = useNavigate();
  const { user, checkRole } = useUserContext();
  const { isMobile } = useDesignSystem();
  if (isMobile) {
    return /* @__PURE__ */ jsx(Fragment, {});
  }
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs(
    Flex,
    {
      align: "center",
      className: "px-4 py-2",
      style: {
        backgroundColor: (_b2 = (_a2 = Theme.components) == null ? void 0 : _a2.Layout) == null ? void 0 : _b2.headerBg,
        borderBottom: (_d = (_c = Theme.components) == null ? void 0 : _c.Layout) == null ? void 0 : _d.headerBorderBottom
      },
      children: [
        /* @__PURE__ */ jsx(Flex, { children: /* @__PURE__ */ jsx(Logo, { height: 40 }) }),
        /* @__PURE__ */ jsx(Flex, { vertical: true, flex: 1, style: { overflowX: "hidden" }, children: /* @__PURE__ */ jsx(
          Menu,
          {
            mode: "horizontal",
            items,
            selectedKeys: [keySelected],
            overflowedIndicator: /* @__PURE__ */ jsx(MenuOutlined, {}),
            style: { flex: 1 }
          }
        ) }),
        /* @__PURE__ */ jsxs(Flex, { align: "center", gap: "middle", children: [
          checkRole("ADMIN") && /* @__PURE__ */ jsx(Tag, { color: "red", bordered: false, children: "Admin" }),
          user && /* @__PURE__ */ jsx(
            Avatar,
            {
              src: user.pictureUrl,
              alt: user.name,
              size: 40,
              onClick: () => router("/profile"),
              style: { cursor: "pointer" },
              children: Utility.stringToInitials(user.name)
            }
          )
        ] })
      ]
    }
  ) });
};
const NavigationLayout = ({ children }) => {
  const router = useNavigate();
  const pathname = useLocation().pathname;
  const params = useParams();
  const { checkRole } = useUserContext();
  const { mutateAsync: logout } = Api.authentication.logout.useMutation({
    onSuccess: (data) => {
      if (data.redirect) {
        window.location.href = data.redirect;
      }
    }
  });
  const goTo = (url) => {
    router(url);
  };
  const items = [
    {
      key: "/admin/control-panel",
      label: "Control Panel",
      position: "leftbar",
      icon: /* @__PURE__ */ jsx("i", { className: "las la-cogs" }),
      onClick: () => goTo("/admin/control-panel"),
      isVisible: checkRole("ADMIN")
    },
    {
      key: "/skillfeed",
      label: "Skill Feed",
      position: "topbar",
      icon: /* @__PURE__ */ jsx(HomeOutlined, {}),
      onClick: () => goTo("/skillfeed")
    },
    {
      key: "/courses",
      label: "Courses",
      position: "topbar",
      icon: /* @__PURE__ */ jsx(HomeOutlined, {}),
      onClick: () => goTo("/courses")
    },
    {
      key: "/my-courses",
      label: "My Courses",
      position: "topbar",
      icon: /* @__PURE__ */ jsx("i", { className: "las la-graduation-cap" }),
      onClick: () => goTo("/my-courses")
    },
    {
      key: "/wallet",
      label: "Wallet",
      position: "topbar",
      icon: /* @__PURE__ */ jsx("i", { className: "las la-wallet" }),
      onClick: () => goTo("/wallet")
    },
    {
      key: "/settings",
      label: "Settings",
      position: "topbar",
      icon: /* @__PURE__ */ jsx(SettingOutlined, {}),
      onClick: () => goTo("/settings")
    },
    {
      key: "/logout",
      label: "Logout",
      position: "topbar",
      icon: /* @__PURE__ */ jsx(LogoutOutlined, {}),
      onClick: () => logout()
    }
  ];
  const itemsVisible = items.filter((item) => item.isVisible !== false).map((item) => ({
    key: item.key,
    label: item.label,
    icon: item.icon,
    position: item.position,
    onClick: item.onClick
  }));
  const itemsTopbar = itemsVisible.filter((item) => item.position === "topbar");
  const itemsLeftbar = itemsVisible.filter((item) => item.position === "leftbar");
  const itemsLeftbottom = itemsVisible.filter(
    (item) => item.position === "leftbar-bottom"
  );
  const itemsMobile = itemsVisible;
  let keySelected = pathname;
  Object.entries(params).forEach(([key, value]) => {
    keySelected = keySelected.replace(`/${value}`, `/:${key}`);
  });
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Topbar, { keySelected, items: itemsTopbar }),
    /* @__PURE__ */ jsx(Mobilebar, { keySelected, items: itemsMobile }),
    /* @__PURE__ */ jsxs(Flex, { flex: 1, style: { overflowY: "hidden" }, children: [
      /* @__PURE__ */ jsx(
        Leftbar,
        {
          keySelected,
          items: itemsLeftbar,
          itemsBottom: itemsLeftbottom
        }
      ),
      /* @__PURE__ */ jsx(Flex, { flex: 1, vertical: true, style: { overflowY: "hidden" }, children })
    ] })
  ] });
};
const getLayoutBreakpoints = (layout) => {
  const mapping = {
    "full-width": {
      xs: { span: 24 },
      sm: { span: 24 },
      md: { span: 24 },
      lg: { span: 24 },
      xl: { span: 24 },
      xxl: { span: 24 }
    },
    narrow: {
      xs: { span: 24 },
      sm: { span: 24 },
      md: { span: 24 },
      lg: { span: 16 },
      xl: { span: 14 },
      xxl: { span: 12 }
    },
    "super-narrow": {
      xs: { span: 24 },
      sm: { span: 24 },
      md: { span: 24 },
      lg: { span: 12 },
      xl: { span: 10 },
      xxl: { span: 8 }
    }
  };
  return mapping[layout] ?? mapping["full-width"];
};
const PageLayout = ({
  id,
  children,
  gap,
  layout = "full-width",
  isFlex = false,
  isCentered = false,
  isScrollable = true,
  isLoading = false,
  ...props
}) => {
  const breakpoints = getLayoutBreakpoints(layout);
  const isFlexUsed = isFlex || isCentered || isLoading;
  return /* @__PURE__ */ jsx(
    Row,
    {
      id,
      justify: "center",
      style: {
        flex: 1,
        overflowY: isScrollable ? "auto" : void 0,
        overflowX: "hidden"
      },
      children: /* @__PURE__ */ jsxs(Col, { ...props, ...breakpoints, children: [
        isFlexUsed && /* @__PURE__ */ jsxs(
          Flex,
          {
            vertical: true,
            className: "h-full",
            justify: isCentered || isLoading ? "center" : void 0,
            align: isCentered || isLoading ? "center" : void 0,
            gap,
            children: [
              isLoading && /* @__PURE__ */ jsx(Spin, { indicator: /* @__PURE__ */ jsx(LoadingOutlined, { spin: true }) }),
              !isLoading && children
            ]
          }
        ),
        !isFlexUsed && /* @__PURE__ */ jsx("div", { className: "h-full", children })
      ] })
    }
  );
};
const { Text: Text$a, Title: Title$d } = Typography;
const AppHeader = ({
  title = "SKILLFLOW",
  description
}) => {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Flex, { justify: "center", children: /* @__PURE__ */ jsx(Logo, { height: "100" }) }),
    /* @__PURE__ */ jsxs(Flex, { vertical: true, align: "center", children: [
      /* @__PURE__ */ jsx(Title$d, { level: 3, style: { margin: 0 }, children: title }),
      description && /* @__PURE__ */ jsx(Text$a, { type: "secondary", children: description })
    ] })
  ] });
};
const isDevelopment = () => process.env.NODE_ENV === "development";
const isProduction$1 = () => process.env.NODE_ENV === "production";
const getBaseUrl = () => {
  const isServer = typeof window !== "undefined";
  const baseUrl = process.env.BASE_URL;
  const port = process.env.PORT ?? 8099;
  if (isServer) {
    return "";
  }
  if (baseUrl) {
    if (baseUrl.startsWith("http")) {
      return baseUrl;
    } else {
      return `https://${baseUrl}`;
    }
  }
  return `http://localhost:${port}`;
};
const getAuthenticationSecret = () => {
  return process.env.SERVER_AUTHENTICATION_SECRET;
};
const Configuration = {
  isDevelopment,
  isProduction: isProduction$1,
  getBaseUrl,
  getAuthenticationSecret
};
const importPostHogProvider = async () => {
  if (typeof window !== "undefined") {
    const value = (await import("posthog-js/react/dist/esm/index.js")).PostHogProvider;
    return value;
  }
};
const AnalyticsProvider = ({ children }) => {
  const { data, isLoading } = Api.configuration.getPublic.useQuery();
  const PostHogProvider = useRef();
  useEffect(() => {
    const isProduction2 = Configuration.isProduction();
    const canActivate = typeof window !== "undefined" && !isLoading && data && isProduction2;
    if (canActivate) {
      const key = data["PUBLIC_POSTHOG_KEY"];
      const host = data["PUBLIC_POSTHOG_HOST"];
      try {
        Posthog.init(key, {
          api_host: host
        });
      } catch (error) {
        console.log(`Could not start analytics: ${error.message}`);
      }
    }
  }, [data, isLoading]);
  useEffect(() => {
    importPostHogProvider().then((value) => PostHogProvider.current = value);
  }, []);
  if (!PostHogProvider.current) {
    return /* @__PURE__ */ jsx(Fragment, { children });
  }
  return /* @__PURE__ */ jsx(PostHogProvider.current, { client: Posthog, children });
};
const meta = () => {
  return [
    { title: "SKILLFLOW" },
    {
      name: "description",
      content: "SKILLFLOW"
    }
  ];
};
const links = () => {
  const items = [
    { rel: "preconnect", href: "https://fonts.googleapis.com" },
    {
      rel: "preconnect",
      href: "https://fonts.gstatic.com",
      crossOrigin: "anonymous"
    },
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
    },
    {
      rel: "stylesheet",
      href: "https://maxst.icons8.com/vue-static/landings/line-awesome/line-awesome/1.3.0/css/line-awesome.min.css"
    }
  ];
  return items;
};
function Layout({ children }) {
  return /* @__PURE__ */ jsxs("html", { lang: "en", children: [
    /* @__PURE__ */ jsxs("head", { children: [
      /* @__PURE__ */ jsx("meta", { charSet: "utf-8" }),
      /* @__PURE__ */ jsx("meta", { name: "viewport", content: "width=device-width, initial-scale=1" }),
      /* @__PURE__ */ jsx(Meta, {}),
      /* @__PURE__ */ jsx(Links, {}),
      /* @__PURE__ */ jsx("link", { rel: "icon", href: "https://marblism-dashboard-api--production-public.s3.us-west-1.amazonaws.com/gDTGyB-skillaff-q0fm" })
    ] }),
    /* @__PURE__ */ jsxs("body", { children: [
      /* @__PURE__ */ jsx(DesignSystemProvider, { children: /* @__PURE__ */ jsx(TrpcClient.Provider, { children: /* @__PURE__ */ jsx(AnalyticsProvider, { children: /* @__PURE__ */ jsx(WorkspaceProvider, { children: /* @__PURE__ */ jsx(UserProvider, { children }) }) }) }) }),
      /* @__PURE__ */ jsx(ScrollRestoration, {}),
      /* @__PURE__ */ jsx(Scripts, {})
    ] })
  ] });
}
function App() {
  return /* @__PURE__ */ jsx(UserProvider, { children: /* @__PURE__ */ jsx(Outlet, {}) });
}
const route0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Layout,
  default: App,
  links,
  meta
}, Symbol.toStringTag, { value: "Module" }));
const useUploadPublic = () => useMutation({
  mutationFn: async ({ file }) => {
    const formData = new FormData();
    formData.append("file", file, file.name);
    const response = await axios.post(
      "/api/upload/public",
      formData
    );
    return response.data;
  }
});
const ImageSafe = ({
  srcOnError,
  style = {},
  isPretty = false,
  isHiddenOnError = false,
  styleImg = {},
  styleWrapper = {},
  width = "200px",
  height = width,
  ...props
}) => {
  const [isHidden, setHidden] = useState(false);
  const [isLoaded, setLoaded] = useState(false);
  const isBackgroundGradient = isHidden && !srcOnError && !isHiddenOnError;
  const styleImgPretty = {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    objectPosition: "center",
    opacity: isBackgroundGradient ? 0 : 1
  };
  const styleWrapperPretty = {
    width: "100%",
    height: "100%",
    maxWidth: width,
    minWidth: width,
    maxHeight: height,
    minHeight: height,
    borderRadius: "16px",
    border: "1px solid rgba(0, 0, 0, 0.088)",
    transition: "opacity 0.3s ease",
    aspectRatio: "1",
    overflow: "hidden",
    background: isBackgroundGradient ? "linear-gradient(135deg, #f6d365 0%, #fda085 100%)" : void 0
  };
  const onLoad = () => setLoaded(true);
  const srcEnsured = props.src ?? srcOnError;
  const onError = srcOnError ? (event) => {
    const target = event.target;
    target.onerror = null;
    target.src = srcOnError;
  } : () => setHidden(true);
  if (!srcOnError && isHiddenOnError && isHidden) {
    return /* @__PURE__ */ jsx(Fragment, {});
  }
  if (isPretty) {
    return /* @__PURE__ */ jsx(
      "div",
      {
        style: {
          opacity: isLoaded || isBackgroundGradient ? 1 : 0,
          ...styleWrapperPretty,
          ...style,
          ...styleWrapper
        },
        children: /* @__PURE__ */ jsx(
          "img",
          {
            ...props,
            src: srcEnsured,
            alt: props.alt,
            style: { ...styleImgPretty, ...styleImg },
            onLoad,
            onError
          }
        )
      }
    );
  }
  return /* @__PURE__ */ jsx(
    "img",
    {
      ...props,
      src: srcEnsured,
      alt: props.alt,
      style: { ...style, ...styleImg },
      onError
    }
  );
};
const ImageOptimizedClient = {
  Img: ImageSafe
};
const { Title: Title$c } = Typography;
function CourseEditPage() {
  const { courseId } = useParams();
  const [form] = Form.useForm();
  const [sectionForm] = Form.useForm();
  const [videoForm] = Form.useForm();
  const [isVideoModalVisible, setIsVideoModalVisible] = useState(false);
  const [selectedSectionId, setSelectedSectionId] = useState();
  const [editingVideo, setEditingVideo] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sectionToDelete, setSectionToDelete] = useState(null);
  const [showFirstConfirm, setShowFirstConfirm] = useState(false);
  const [showSecondConfirm, setShowSecondConfirm] = useState(false);
  const [videoToDelete, setVideoToDelete] = useState(null);
  const [fileList, setFileList] = useState([]);
  useEffect(() => {
    if (course == null ? void 0 : course.previewUrl) {
      setFileList([
        {
          uid: "-1",
          name: "preview.png",
          status: "done",
          url: course.previewUrl
        }
      ]);
    }
    const loadTikTokScript = () => {
      const script2 = document.createElement("script");
      script2.src = "https://www.tiktok.com/embed.js";
      script2.async = true;
      document.body.appendChild(script2);
      return script2;
    };
    const script = loadTikTokScript();
    return () => {
      if (script) document.body.removeChild(script);
    };
  }, []);
  const { mutateAsync: upload } = useUploadPublic();
  const {
    data: course,
    isLoading,
    refetch
  } = Api.course.findUnique.useQuery({
    where: { id: courseId },
    include: { sections: { include: { videos: true } } }
  });
  const { mutateAsync: updateCourse } = Api.course.update.useMutation();
  const { mutateAsync: createSection } = Api.section.create.useMutation();
  const { mutateAsync: createVideo } = Api.video.create.useMutation();
  const { mutateAsync: updateVideo } = Api.video.update.useMutation();
  const { mutateAsync: deleteVideo } = Api.video.delete.useMutation();
  const { mutateAsync: deleteSection } = Api.section.delete.useMutation();
  const handleCourseSubmit = async (values) => {
    try {
      let previewUrl = course.previewUrl;
      if (fileList.length > 0 && fileList[0] instanceof File) {
        try {
          const { url } = await upload({ file: fileList[0] });
          previewUrl = url;
        } catch (error) {
          console.error("Image upload error:", error);
          message.error("Failed to upload image: " + error.message);
          return;
        }
      }
      const { paymentLink, ...rest } = values;
      const updateData = {
        ...rest,
        previewUrl,
        paymentLink: paymentLink || null
      };
      console.log("Updating course with data:", updateData);
      await updateCourse({
        where: { id: courseId },
        data: updateData
      });
      message.success("Course updated successfully");
      refetch();
    } catch (error) {
      console.error("Course update error:", error);
      message.error(`Failed to update course: ${error.message}`);
      message.error("Please check the form values and try again");
    }
  };
  const handleAddSection = async (values) => {
    try {
      await createSection({
        data: {
          ...values,
          courseId
        }
      });
      message.success("Section added successfully");
      sectionForm.resetFields();
      refetch();
    } catch (error) {
      message.error("Failed to add section");
    }
  };
  const handleEditVideo = (video) => {
    setEditingVideo(video);
    videoForm.setFieldsValue(video);
    setIsVideoModalVisible(true);
  };
  const handleDeleteVideo = async (videoId) => {
    try {
      await deleteVideo({ where: { id: videoId } });
      message.success("Video deleted successfully");
      refetch();
    } catch (error) {
      console.error("Delete video error:", error);
      message.error(`Failed to delete video: ${error.message}`);
    }
  };
  const handleDeleteSection = async (sectionId) => {
    try {
      await deleteSection({ where: { id: sectionId } });
      message.success("Section deleted successfully");
      refetch();
    } catch (error) {
      console.error("Delete section error:", error);
      message.error(`Failed to delete section: ${error.message}`);
    } finally {
      setSectionToDelete(null);
      setShowFirstConfirm(false);
      setShowSecondConfirm(false);
    }
  };
  const handleAddVideo = async (values) => {
    setIsSubmitting(true);
    try {
      const videoData = {
        title: values.title,
        description: values.description,
        embedLink: values.embedLink,
        order: values.order,
        sectionId: selectedSectionId
      };
      if (editingVideo) {
        await updateVideo({
          where: { id: editingVideo.id },
          data: videoData
        });
        message.success("Video updated successfully");
      } else {
        await createVideo({
          data: videoData
        });
        message.success("Video added successfully");
      }
      refetch();
    } catch (error) {
      console.error("Video save error:", error);
      message.error(`Failed to save video: ${error.message}`);
    } finally {
      setIsVideoModalVisible(false);
      setEditingVideo(null);
      videoForm.resetFields();
      setIsSubmitting(false);
    }
  };
  if (isLoading) {
    return /* @__PURE__ */ jsx(PageLayout, { children: /* @__PURE__ */ jsx("div", { className: "flex justify-center items-center h-full", children: /* @__PURE__ */ jsx(Spin, { size: "large" }) }) });
  }
  return /* @__PURE__ */ jsx(PageLayout, { children: /* @__PURE__ */ jsxs("div", { className: "max-w-4xl mx-auto p-6 md:p-4 sm:p-2", children: [
    /* @__PURE__ */ jsx(Title$c, { level: 2, children: "Edit Course" }),
    /* @__PURE__ */ jsxs(
      Form,
      {
        form,
        layout: "vertical",
        initialValues: course,
        onFinish: handleCourseSubmit,
        className: "mb-8",
        children: [
          /* @__PURE__ */ jsx(
            Form.Item,
            {
              name: "title",
              label: "Title",
              rules: [{ required: true }],
              className: "w-full",
              children: /* @__PURE__ */ jsx(Input, { className: "w-full" })
            }
          ),
          (course == null ? void 0 : course.previewUrl) && /* @__PURE__ */ jsx(Form.Item, { name: "previewUrl", label: "Current Preview Image", children: /* @__PURE__ */ jsx(
            ImageOptimizedClient.Img,
            {
              src: course.previewUrl,
              isPretty: true,
              styleWrapper: {
                position: "relative",
                maxWidth: "100%",
                height: "auto",
                aspectRatio: "16/9"
              },
              styleImg: {
                objectFit: "cover",
                objectPosition: "center",
                width: "100%",
                height: "100%"
              }
            }
          ) }),
          /* @__PURE__ */ jsx(
            Form.Item,
            {
              name: "previewUrl",
              label: (course == null ? void 0 : course.previewUrl) ? "Change Preview Image" : "Preview Image",
              children: /* @__PURE__ */ jsx(
                Upload,
                {
                  fileList,
                  beforeUpload: (file) => {
                    const isLt2M = file.size / 1024 / 1024 < 2;
                    if (!isLt2M) {
                      message.error("Image must be smaller than 2MB");
                      return false;
                    }
                    setFileList([file]);
                    return false;
                  },
                  onRemove: () => setFileList([]),
                  maxCount: 1,
                  listType: "picture",
                  children: fileList.length === 0 && "+ Upload"
                }
              )
            }
          ),
          /* @__PURE__ */ jsx(
            Form.Item,
            {
              name: "description",
              label: "Description",
              rules: [{ required: true }],
              className: "w-full",
              children: /* @__PURE__ */ jsx(Input.TextArea, { className: "w-full" })
            }
          ),
          /* @__PURE__ */ jsx(
            Form.Item,
            {
              name: "price",
              label: "Price (XAF)",
              rules: [{ required: true }],
              className: "w-full",
              children: /* @__PURE__ */ jsx(Input, { className: "w-full" })
            }
          ),
          /* @__PURE__ */ jsx(Form.Item, { name: "paymentLink", label: "Payment Link", className: "w-full", children: /* @__PURE__ */ jsx(Input, { className: "w-full", placeholder: "Enter payment URL" }) }),
          /* @__PURE__ */ jsx(
            Form.Item,
            {
              name: "isPremium",
              label: "Premium Course",
              valuePropName: "checked",
              className: "w-full",
              children: /* @__PURE__ */ jsx(Switch, {})
            }
          ),
          /* @__PURE__ */ jsx(Button, { type: "primary", htmlType: "submit", children: "Update Course" })
        ]
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "mb-8", children: [
      /* @__PURE__ */ jsx(Title$c, { level: 3, children: "Sections" }),
      /* @__PURE__ */ jsxs(
        Form,
        {
          form: sectionForm,
          layout: "vertical",
          onFinish: handleAddSection,
          children: [
            /* @__PURE__ */ jsx(
              Form.Item,
              {
                name: "title",
                label: "Section Title",
                rules: [{ required: true }],
                className: "w-full",
                children: /* @__PURE__ */ jsx(Input, { className: "w-full" })
              }
            ),
            /* @__PURE__ */ jsx(
              Form.Item,
              {
                name: "order",
                label: "Order",
                rules: [{ required: true }],
                className: "w-full",
                children: /* @__PURE__ */ jsx(InputNumber, { min: 1, className: "w-full" })
              }
            ),
            /* @__PURE__ */ jsx(Button, { type: "primary", htmlType: "submit", children: "Add Section" })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsx(
      List,
      {
        dataSource: course == null ? void 0 : course.sections,
        renderItem: (section) => /* @__PURE__ */ jsx(List.Item, { children: /* @__PURE__ */ jsxs("div", { className: "w-full", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row justify-between items-center mb-4", children: [
            /* @__PURE__ */ jsx(Title$c, { level: 4, children: section.title }),
            /* @__PURE__ */ jsxs(Space, { gap: 2, children: [
              /* @__PURE__ */ jsx(
                Button,
                {
                  type: "primary",
                  onClick: () => {
                    setSelectedSectionId(section.id);
                    setIsVideoModalVisible(true);
                  },
                  children: "Add Video"
                }
              ),
              /* @__PURE__ */ jsx(
                Button,
                {
                  danger: true,
                  onClick: () => {
                    setSectionToDelete(section.id);
                    setShowFirstConfirm(true);
                  },
                  children: "Delete Section"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsx(
            Table,
            {
              dataSource: section.videos,
              columns: [
                { title: "Title", dataIndex: "title", ellipsis: true },
                { title: "Source", dataIndex: "embedLink", ellipsis: true },
                { title: "Order", dataIndex: "order", ellipsis: true },
                {
                  title: "Actions",
                  render: (_, video) => /* @__PURE__ */ jsxs(Space, { children: [
                    /* @__PURE__ */ jsx(Button, { onClick: () => handleEditVideo(video), children: "Edit" }),
                    /* @__PURE__ */ jsx(
                      Button,
                      {
                        danger: true,
                        onClick: () => setVideoToDelete(video.id),
                        children: "Delete"
                      }
                    )
                  ] })
                }
              ],
              pagination: false,
              scroll: { x: true },
              responsive: true
            }
          )
        ] }) })
      }
    ),
    /* @__PURE__ */ jsx(
      Modal,
      {
        title: editingVideo ? "Edit Video" : "Add Video",
        open: isVideoModalVisible,
        width: "100%",
        centered: true,
        onCancel: () => {
          setIsVideoModalVisible(false);
          setEditingVideo(null);
          videoForm.resetFields();
        },
        footer: null,
        children: /* @__PURE__ */ jsxs(Form, { form: videoForm, layout: "vertical", onFinish: handleAddVideo, children: [
          /* @__PURE__ */ jsx(
            Form.Item,
            {
              name: "title",
              label: "Title",
              rules: [
                { required: true },
                { max: 100, message: "Title cannot exceed 100 characters" }
              ],
              children: /* @__PURE__ */ jsx(Input, {})
            }
          ),
          /* @__PURE__ */ jsx(
            Form.Item,
            {
              name: "description",
              label: "Description",
              rules: [
                { required: true },
                {
                  max: 500,
                  message: "Description cannot exceed 500 characters"
                }
              ],
              children: /* @__PURE__ */ jsx(Input.TextArea, {})
            }
          ),
          /* @__PURE__ */ jsx(
            Form.Item,
            {
              name: "embedLink",
              label: "Embed Link",
              rules: [{ required: true, message: "Please input video link!" }],
              children: /* @__PURE__ */ jsx(Input, {})
            }
          ),
          /* @__PURE__ */ jsx(Form.Item, { name: "order", label: "Order", rules: [{ required: true }], children: /* @__PURE__ */ jsx(InputNumber, { min: 1 }) }),
          /* @__PURE__ */ jsxs(Button, { type: "primary", htmlType: "submit", loading: isSubmitting, children: [
            editingVideo ? "Update" : "Add",
            " Video"
          ] })
        ] })
      }
    ),
    /* @__PURE__ */ jsx(
      Modal,
      {
        title: "Delete Section",
        open: showFirstConfirm,
        width: "100%",
        centered: true,
        onOk: () => {
          setShowFirstConfirm(false);
          setShowSecondConfirm(true);
        },
        onCancel: () => {
          setSectionToDelete(null);
          setShowFirstConfirm(false);
        },
        children: /* @__PURE__ */ jsx("p", { children: "Are you sure you want to delete this section? All videos will be deleted." })
      }
    ),
    /* @__PURE__ */ jsx(
      Modal,
      {
        title: "Final Confirmation",
        open: showSecondConfirm,
        width: "100%",
        centered: true,
        onOk: () => handleDeleteSection(sectionToDelete),
        onCancel: () => {
          setSectionToDelete(null);
          setShowSecondConfirm(false);
        },
        children: /* @__PURE__ */ jsx("p", { children: "This action cannot be undone. Are you absolutely sure?" })
      }
    ),
    /* @__PURE__ */ jsx(
      Modal,
      {
        title: "Delete Video",
        open: !!videoToDelete,
        width: "100%",
        centered: true,
        onOk: () => {
          handleDeleteVideo(videoToDelete);
          setVideoToDelete(null);
        },
        onCancel: () => setVideoToDelete(null),
        children: /* @__PURE__ */ jsx("p", { children: "Are you sure you want to delete this video? This action cannot be undone." })
      }
    )
  ] }) });
}
const route1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: CourseEditPage
}, Symbol.toStringTag, { value: "Module" }));
const { Title: Title$b, Text: Text$9 } = Typography;
function CoursePreviewPage() {
  var _a2;
  const navigate = useNavigate();
  const { isLoggedIn } = useUserContext();
  const { courseId } = useParams();
  const { data: course, isLoading } = Api.course.findUnique.useQuery({
    where: { id: courseId },
    include: { sections: { include: { videos: true } } }
  });
  const handleGetNow = async (course2) => {
    if (!isLoggedIn) {
      message.warning("Please login to join courses");
      navigate("/login");
      return;
    }
    if (!course2.paymentLink) {
      message.warning("Payment link not available");
      return;
    }
    window.location.href = course2.paymentLink;
  };
  if (isLoading) {
    return /* @__PURE__ */ jsx(PageLayout, { layout: "full-width", children: /* @__PURE__ */ jsx("div", { style: { textAlign: "center", padding: "50px" }, children: /* @__PURE__ */ jsx(Spin, { size: "large" }) }) });
  }
  return /* @__PURE__ */ jsxs(PageLayout, { layout: "full-width", children: [
    /* @__PURE__ */ jsx("div", { style: { maxWidth: "1200px", margin: "0 auto" }, children: /* @__PURE__ */ jsx(
      ImageOptimizedClient.Img,
      {
        src: course == null ? void 0 : course.previewUrl,
        srcOnError: "/images/course-fallback.jpg",
        isPretty: true,
        styleWrapper: {
          position: "relative",
          maxWidth: "100%",
          height: "auto",
          aspectRatio: "16/9"
        },
        styleImg: {
          objectFit: "cover",
          objectPosition: "center",
          width: "100%",
          height: "100%"
        }
      }
    ) }),
    /* @__PURE__ */ jsxs("div", { style: { maxWidth: "1200px", margin: "0 auto", padding: "20px" }, children: [
      /* @__PURE__ */ jsx(Title$b, { level: 2, children: course == null ? void 0 : course.title }),
      /* @__PURE__ */ jsx(Text$9, { children: course == null ? void 0 : course.description }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 mt-4", children: [
        /* @__PURE__ */ jsxs(Text$9, { strong: true, children: [
          "XAF ",
          course == null ? void 0 : course.price
        ] }),
        /* @__PURE__ */ jsx(Button, { type: "primary", onClick: () => handleGetNow(course), children: "GET NOW" })
      ] }),
      /* @__PURE__ */ jsx(
        List,
        {
          className: "mt-8",
          dataSource: (_a2 = course == null ? void 0 : course.sections) == null ? void 0 : _a2.sort((a, b) => a.order - b.order),
          renderItem: (section) => {
            var _a3;
            return /* @__PURE__ */ jsx(List.Item, { children: /* @__PURE__ */ jsx(Card, { title: section.title, className: "w-full", children: /* @__PURE__ */ jsx(
              List,
              {
                dataSource: (_a3 = section.videos) == null ? void 0 : _a3.sort((a, b) => a.order - b.order),
                renderItem: (video) => /* @__PURE__ */ jsx(List.Item, { children: /* @__PURE__ */ jsx(Text$9, { children: video.title }) })
              }
            ) }) });
          }
        }
      ),
      /* @__PURE__ */ jsxs(
        Card,
        {
          style: {
            marginTop: "24px",
            textAlign: "center",
            background: "#f0f7ff"
          },
          children: [
            /* @__PURE__ */ jsxs(Title$b, { level: 4, children: [
              /* @__PURE__ */ jsx("i", { className: "las la-crown" }),
              " Unlock All Premium Content"
            ] }),
            /* @__PURE__ */ jsx(Text$9, { children: "Get unlimited access to all our premium courses and exclusive content." }),
            /* @__PURE__ */ jsx("div", { style: { marginTop: "16px" }, children: /* @__PURE__ */ jsx(
              Button,
              {
                type: "primary",
                size: "large",
                onClick: () => navigate("/upgrade"),
                children: "Upgrade Now"
              }
            ) })
          ]
        }
      )
    ] })
  ] });
}
const route2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: CoursePreviewPage
}, Symbol.toStringTag, { value: "Module" }));
const { Text: Text$8 } = Typography;
function ResetPasswordTokenPage() {
  const router = useNavigate();
  const { token } = useParams();
  const [form] = Form.useForm();
  const {
    mutateAsync: resetPassword,
    isLoading,
    isSuccess
  } = Api.authentication.resetPassword.useMutation();
  const handleSubmit = async (values) => {
    try {
      await resetPassword({ token, password: values.password });
    } catch (error) {
      message.error(`Could not reset password: ${error.message}`);
    }
  };
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx(Flex, { align: "center", justify: "center", vertical: true, flex: 1, children: /* @__PURE__ */ jsxs(
    Flex,
    {
      vertical: true,
      style: {
        width: "340px",
        paddingBottom: "100px",
        paddingTop: "100px"
      },
      gap: "middle",
      children: [
        /* @__PURE__ */ jsx(AppHeader, { description: "Change your password" }),
        isSuccess && /* @__PURE__ */ jsx(
          Alert,
          {
            style: { textAlign: "center" },
            type: "success",
            message: "Your password has been changed."
          }
        ),
        !isSuccess && /* @__PURE__ */ jsxs(
          Form,
          {
            form,
            onFinish: handleSubmit,
            layout: "vertical",
            requiredMark: false,
            children: [
              /* @__PURE__ */ jsx(
                Form.Item,
                {
                  label: "Password",
                  name: "password",
                  rules: [{ required: true, message: "Password is required" }],
                  children: /* @__PURE__ */ jsx(
                    Input.Password,
                    {
                      type: "password",
                      placeholder: "Your new password",
                      autoComplete: "current-password"
                    }
                  )
                }
              ),
              /* @__PURE__ */ jsx(
                Form.Item,
                {
                  label: "Password confirmation",
                  name: "passwordConfirmation",
                  rules: [
                    {
                      required: true,
                      message: "Password confirmation is required"
                    }
                  ],
                  children: /* @__PURE__ */ jsx(
                    Input.Password,
                    {
                      type: "password",
                      placeholder: "Password confirmation",
                      autoComplete: "current-password"
                    }
                  )
                }
              ),
              /* @__PURE__ */ jsx(Form.Item, { children: /* @__PURE__ */ jsx(
                Button,
                {
                  type: "primary",
                  htmlType: "submit",
                  loading: isLoading,
                  block: true,
                  children: "Reset Password"
                }
              ) })
            ]
          }
        ),
        /* @__PURE__ */ jsxs(Flex, { justify: "center", align: "center", children: [
          /* @__PURE__ */ jsx(
            Button,
            {
              ghost: true,
              style: { border: "none" },
              onClick: () => router("/login"),
              children: /* @__PURE__ */ jsx(Flex, { gap: "small", justify: "center", children: /* @__PURE__ */ jsx(Text$8, { children: "Sign in" }) })
            }
          ),
          /* @__PURE__ */ jsx(Text$8, { type: "secondary", children: "or" }),
          /* @__PURE__ */ jsx(
            Button,
            {
              ghost: true,
              style: { border: "none" },
              onClick: () => router("/register"),
              children: /* @__PURE__ */ jsx(Flex, { gap: "small", justify: "center", children: /* @__PURE__ */ jsx(Text$8, { children: "Sign up" }) })
            }
          )
        ] })
      ]
    }
  ) }) });
}
const route3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ResetPasswordTokenPage
}, Symbol.toStringTag, { value: "Module" }));
const { Title: Title$a } = Typography;
function CoursesTab() {
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState(null);
  const {
    data: courses,
    isLoading,
    refetch
  } = Api.course.findMany.useQuery({
    where: {
      AND: [
        typeFilter === "premium" ? { isPremium: true } : typeFilter === "free" ? { isPremium: false } : {},
        {
          OR: [
            { title: { contains: searchQuery } },
            { description: { contains: searchQuery } }
          ]
        }
      ]
    }
  });
  const { mutateAsync: createCourse } = Api.course.create.useMutation();
  const { mutateAsync: updateCourse } = Api.course.update.useMutation();
  const { mutateAsync: deleteCourse } = Api.course.delete.useMutation();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [form] = Form.useForm();
  const handleCreate = () => {
    setEditingCourse(null);
    form.resetFields();
    setIsModalVisible(true);
  };
  const handleEdit = (record) => {
    window.location.href = `/admin/courses/${record.id}/edit`;
  };
  const handleDelete = async (id) => {
    try {
      await deleteCourse({ where: { id } });
      message.success("Course deleted successfully");
      refetch();
    } catch (error) {
      message.error("Failed to delete course");
    }
  };
  const handleModalOk = async () => {
    try {
      const values = await form.validateFields();
      if (editingCourse) {
        await updateCourse({
          where: { id: editingCourse.id },
          data: values
        });
        message.success("Course updated successfully");
      } else {
        await createCourse({ data: values });
        message.success("Course created successfully");
      }
      setIsModalVisible(false);
      refetch();
    } catch (error) {
      message.error("Failed to save course");
    }
  };
  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title"
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description"
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price) => `XAF ${price}`
    },
    {
      title: "Premium",
      dataIndex: "isPremium",
      key: "isPremium",
      render: (isPremium) => isPremium ? "Yes" : "No"
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ jsx(Button, { icon: /* @__PURE__ */ jsx(EditOutlined, {}), onClick: () => handleEdit(record), children: "Edit" }),
        /* @__PURE__ */ jsx(
          Button,
          {
            danger: true,
            icon: /* @__PURE__ */ jsx(DeleteOutlined, {}),
            onClick: () => handleDelete(record.id),
            children: "Delete"
          }
        )
      ] })
    }
  ];
  return /* @__PURE__ */ jsxs("div", { className: "p-4", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center mb-4", children: [
      /* @__PURE__ */ jsx(Title$a, { level: 3, children: "Courses Management" }),
      /* @__PURE__ */ jsx(Button, { type: "primary", icon: /* @__PURE__ */ jsx(PlusOutlined, {}), onClick: handleCreate, children: "Add Course" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex gap-4 mb-4", children: [
      /* @__PURE__ */ jsx(
        Input.Search,
        {
          placeholder: "Search courses...",
          onChange: (e) => setSearchQuery(e.target.value),
          style: { width: 300 }
        }
      ),
      /* @__PURE__ */ jsx(
        Select,
        {
          placeholder: "Filter by type",
          allowClear: true,
          style: { width: 200 },
          onChange: (value) => setTypeFilter(value),
          options: [
            { label: "All", value: null },
            { label: "Free", value: "free" },
            { label: "Premium", value: "premium" }
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsx(
      Table,
      {
        columns,
        dataSource: courses,
        rowKey: "id",
        loading: isLoading,
        pagination: { pageSize: 10 },
        scroll: { x: true }
      }
    ),
    /* @__PURE__ */ jsx(
      Modal,
      {
        title: editingCourse ? "Edit Course" : "Create Course",
        open: isModalVisible,
        onOk: handleModalOk,
        onCancel: () => setIsModalVisible(false),
        children: /* @__PURE__ */ jsxs(Form, { form, layout: "vertical", children: [
          /* @__PURE__ */ jsx(
            Form.Item,
            {
              name: "title",
              label: "Title",
              rules: [{ required: true, message: "Please input course title!" }],
              children: /* @__PURE__ */ jsx(Input, {})
            }
          ),
          /* @__PURE__ */ jsx(
            Form.Item,
            {
              name: "description",
              label: "Description",
              rules: [
                { required: true, message: "Please input course description!" }
              ],
              children: /* @__PURE__ */ jsx(Input.TextArea, {})
            }
          ),
          /* @__PURE__ */ jsx(Form.Item, { name: "isPremium", label: "Premium", valuePropName: "checked", children: /* @__PURE__ */ jsx(Switch, {}) }),
          /* @__PURE__ */ jsx(
            Form.Item,
            {
              name: "price",
              label: "Price",
              rules: [{ required: true, message: "Please input course price!" }],
              children: /* @__PURE__ */ jsx(Input, { prefix: "XAF" })
            }
          )
        ] })
      }
    )
  ] });
}
const { Text: Text$7 } = Typography;
function PremiumUpgradeTab() {
  const [form] = Form.useForm();
  const {
    data: premiumLink,
    refetch: refetchPremium,
    isLoading: isLoadingPremium,
    error: premiumError
  } = Api.premiumLink.findFirst.useQuery(void 0, {
    retry: false,
    onError: (error) => {
      console.error("Failed to fetch premium link:", error);
      message.error("Failed to load premium link data");
    }
  });
  const {
    data: affiliateLink,
    refetch: refetchAffiliate,
    isLoading: isLoadingAffiliate,
    error: affiliateError
  } = Api.affiliateLink.findFirst.useQuery(void 0, {
    retry: false,
    onError: (error) => {
      console.error("Failed to fetch affiliate link:", error);
      message.error("Failed to load affiliate link data");
    }
  });
  const { mutateAsync: updatePremiumLink, isLoading: isUpdatingPremium } = Api.premiumLink.update.useMutation();
  const { mutateAsync: createPremiumLink, isLoading: isCreatingPremium } = Api.premiumLink.create.useMutation();
  const { mutateAsync: updateAffiliateLink, isLoading: isUpdatingAffiliate } = Api.affiliateLink.update.useMutation();
  const { mutateAsync: createAffiliateLink, isLoading: isCreatingAffiliate } = Api.affiliateLink.create.useMutation();
  const handleSubmit = async (values) => {
    const validateAndSaveLink = async (url, type) => {
      if (!url.trim()) {
        throw new Error(
          `URL cannot be empty - please provide a valid ${type} link`
        );
      }
      if (!url.startsWith("http://") && !url.startsWith("https://")) {
        throw new Error("URL must start with http:// or https://");
      }
      try {
        new URL(url.trim());
      } catch (e) {
        throw new Error(
          "Invalid URL format - must be a complete URL starting with http:// or https://"
        );
      }
      let response;
      if (type === "premium") {
        if (premiumLink == null ? void 0 : premiumLink.id) {
          response = await updatePremiumLink({
            where: { id: premiumLink.id },
            data: { url: url.trim() }
          });
        } else {
          response = await createPremiumLink({
            data: { url: url.trim() }
          });
        }
        await refetchPremium();
      } else {
        if (affiliateLink == null ? void 0 : affiliateLink.id) {
          response = await updateAffiliateLink({
            where: { id: affiliateLink.id },
            data: { url: url.trim() }
          });
        } else {
          response = await createAffiliateLink({
            data: { url: url.trim() }
          });
        }
        await refetchAffiliate();
      }
      return response;
    };
    try {
      const [premiumResponse, affiliateResponse] = await Promise.all([
        validateAndSaveLink(values.premiumUrl, "premium"),
        validateAndSaveLink(values.affiliateUrl, "affiliate")
      ]);
      console.log("Links successfully saved:", {
        premium: premiumResponse,
        affiliate: affiliateResponse
      });
      message.success("Links saved successfully");
      form.setFieldsValue({
        premiumUrl: premiumResponse.url,
        affiliateUrl: affiliateResponse.url
      });
    } catch (error) {
      console.error("Update links error:", error);
      message.error(error.message || "Failed to update links");
    }
  };
  return /* @__PURE__ */ jsxs("div", { className: "p-4", children: [
    /* @__PURE__ */ jsx("div", { className: "mb-4", children: isLoadingPremium ? /* @__PURE__ */ jsx(Text$7, { children: "Loading premium link data..." }) : premiumError ? /* @__PURE__ */ jsx(Text$7, { type: "danger", children: "Error loading premium link data. Please try again." }) : (premiumLink == null ? void 0 : premiumLink.url) && /* @__PURE__ */ jsxs(Text$7, { children: [
      "Current Premium Link: ",
      /* @__PURE__ */ jsx(Text$7, { strong: true, children: premiumLink.url })
    ] }) }),
    /* @__PURE__ */ jsxs(
      Form,
      {
        form,
        onFinish: handleSubmit,
        layout: "vertical",
        initialValues: {
          premiumUrl: premiumLink == null ? void 0 : premiumLink.url,
          affiliateUrl: affiliateLink == null ? void 0 : affiliateLink.url
        },
        disabled: isLoadingPremium || isLoadingAffiliate,
        children: [
          /* @__PURE__ */ jsx(
            Form.Item,
            {
              name: "premiumUrl",
              label: "Payment Link URL",
              rules: [
                { required: true, message: "Payment link URL is required" },
                {
                  type: "url",
                  message: "Please enter a valid URL starting with http:// or https://"
                },
                {
                  validator: async (_, value) => {
                    if (!(value == null ? void 0 : value.trim())) return;
                    try {
                      new URL(value);
                    } catch (e) {
                      throw new Error("Invalid URL format");
                    }
                  }
                }
              ],
              validateTrigger: ["onChange", "onBlur"],
              children: /* @__PURE__ */ jsx(Input, { placeholder: "https://example.com/payment" })
            }
          ),
          /* @__PURE__ */ jsx(Divider, {}),
          /* @__PURE__ */ jsx("div", { className: "mb-4", children: isLoadingAffiliate ? /* @__PURE__ */ jsx(Text$7, { children: "Loading affiliate link data..." }) : affiliateError ? /* @__PURE__ */ jsx(Text$7, { type: "danger", children: "Error loading affiliate link data. Please try again." }) : (affiliateLink == null ? void 0 : affiliateLink.url) && /* @__PURE__ */ jsxs(Text$7, { children: [
            "Current Affiliate Link: ",
            /* @__PURE__ */ jsx(Text$7, { strong: true, children: affiliateLink.url })
          ] }) }),
          /* @__PURE__ */ jsx(
            Form.Item,
            {
              name: "affiliateUrl",
              label: "Affiliate Link URL",
              rules: [
                { required: true, message: "Affiliate link URL is required" },
                {
                  type: "url",
                  message: "Please enter a valid URL starting with http:// or https://"
                },
                {
                  validator: async (_, value) => {
                    if (!(value == null ? void 0 : value.trim())) return;
                    try {
                      new URL(value);
                    } catch (e) {
                      throw new Error("Invalid URL format");
                    }
                  }
                }
              ],
              validateTrigger: ["onChange", "onBlur"],
              children: /* @__PURE__ */ jsx(Input, { placeholder: "https://example.com/affiliate" })
            }
          ),
          /* @__PURE__ */ jsx(Form.Item, { children: /* @__PURE__ */ jsx(
            Button,
            {
              type: "primary",
              htmlType: "submit",
              loading: isUpdatingPremium || isCreatingPremium || isUpdatingAffiliate || isCreatingAffiliate,
              disabled: isUpdatingPremium || isCreatingPremium || isUpdatingAffiliate || isCreatingAffiliate,
              children: isUpdatingPremium || isCreatingPremium || isUpdatingAffiliate || isCreatingAffiliate ? "Saving..." : "Save Links"
            }
          ) })
        ]
      }
    )
  ] });
}
const { Title: Title$9 } = Typography;
function SkillFeedTab() {
  const [form] = Form.useForm();
  const [editingVideo, setEditingVideo] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const {
    data: videos,
    isLoading: isLoadingVideos,
    refetch
  } = Api.skillFeedVideo.findMany.useQuery();
  const { mutateAsync: createVideo, isLoading: isCreating } = Api.skillFeedVideo.create.useMutation();
  const { mutateAsync: updateVideo, isLoading: isUpdating } = Api.skillFeedVideo.update.useMutation();
  const handleSubmit = async (values) => {
    try {
      if (editingVideo) {
        await updateVideo({
          where: { id: editingVideo.id },
          data: values
        });
        message.success("Video updated successfully");
      } else {
        await createVideo({ data: values });
        message.success("Video created successfully");
      }
      setIsModalVisible(false);
      setEditingVideo(null);
      form.resetFields();
      refetch();
    } catch (error) {
      console.error("Create video error:", error);
      message.error(`Failed to create video: ${error.message}`);
    }
  };
  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      width: "150px",
      ellipsis: true,
      render: (text, record) => {
        if ((editingVideo == null ? void 0 : editingVideo.id) === record.id) return text;
        return /* @__PURE__ */ jsx("div", { className: "whitespace-normal", children: text.length > 60 ? `${text.slice(0, 60)}...` : text });
      }
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      width: "150px",
      ellipsis: true,
      render: (text, record) => {
        const truncatedText = text.length > 198 ? `${text.slice(0, 198)}...` : text;
        return /* @__PURE__ */ jsx("div", { className: "whitespace-normal", children: (editingVideo == null ? void 0 : editingVideo.id) === record.id ? text.slice(0, 520) : truncatedText });
      }
    },
    {
      title: "Link",
      dataIndex: "link",
      key: "link",
      width: "150px",
      ellipsis: true,
      render: (text, record) => {
        if ((editingVideo == null ? void 0 : editingVideo.id) === record.id) return text;
        return /* @__PURE__ */ jsx("div", { className: "whitespace-normal", children: text.length > 198 ? `${text.slice(0, 198)}...` : text });
      }
    },
    {
      title: "Actions",
      key: "actions",
      dataIndex: "actions",
      render: (_, record) => /* @__PURE__ */ jsx(
        Button,
        {
          icon: /* @__PURE__ */ jsx(EditOutlined, {}),
          onClick: () => {
            setEditingVideo(record);
            form.setFieldsValue(record);
            setIsModalVisible(true);
          },
          children: "Edit"
        }
      )
    }
  ];
  return /* @__PURE__ */ jsxs("div", { className: "p-4", children: [
    /* @__PURE__ */ jsx("div", { className: "flex justify-between items-center mb-4", children: /* @__PURE__ */ jsx(Title$9, { level: 3, children: "SkillFeed Videos" }) }),
    /* @__PURE__ */ jsx(
      Button,
      {
        type: "primary",
        onClick: () => {
          form.resetFields();
          setEditingVideo(null);
          setIsModalVisible(true);
        },
        className: "mb-4",
        children: "Add Video"
      }
    ),
    /* @__PURE__ */ jsx(
      Modal,
      {
        title: editingVideo ? "Edit Video" : "Add Video",
        open: isModalVisible,
        onCancel: () => {
          setIsModalVisible(false);
          setEditingVideo(null);
          form.resetFields();
        },
        footer: null,
        children: /* @__PURE__ */ jsxs(Form, { form, onFinish: handleSubmit, layout: "vertical", children: [
          /* @__PURE__ */ jsx(
            Form.Item,
            {
              name: "title",
              label: "Title",
              rules: [{ required: true, message: "Please input video title!" }],
              children: /* @__PURE__ */ jsx(Input, {})
            }
          ),
          /* @__PURE__ */ jsx(
            Form.Item,
            {
              name: "description",
              label: "Description",
              rules: [
                { required: true, message: "Please input video description!" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (value && value.length > 520) {
                      return Promise.reject(new Error("Description must be 520 characters or fewer!"));
                    }
                    return Promise.resolve();
                  }
                })
              ],
              children: /* @__PURE__ */ jsx(
                Input.TextArea,
                {
                  maxLength: 520,
                  showCount: true,
                  placeholder: "Enter your video description (max 520 characters)"
                }
              )
            }
          ),
          /* @__PURE__ */ jsx(
            Form.Item,
            {
              name: "link",
              label: "Link",
              rules: [
                { required: true, message: "Please input video link!" }
              ],
              children: /* @__PURE__ */ jsx(Input, {})
            }
          ),
          /* @__PURE__ */ jsx(Form.Item, { children: /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
            /* @__PURE__ */ jsxs(
              Button,
              {
                type: "primary",
                htmlType: "submit",
                loading: isCreating || isUpdating,
                children: [
                  editingVideo ? "Update" : "Add",
                  " Video"
                ]
              }
            ),
            /* @__PURE__ */ jsx(
              Button,
              {
                onClick: () => {
                  setIsModalVisible(false);
                  setEditingVideo(null);
                  form.resetFields();
                },
                children: "Cancel"
              }
            )
          ] }) })
        ] })
      }
    ),
    /* @__PURE__ */ jsx(
      Table,
      {
        columns,
        dataSource: videos,
        rowKey: "id",
        loading: isLoadingVideos,
        pagination: { pageSize: 10 },
        scroll: { x: true }
      }
    )
  ] });
}
const { Title: Title$8 } = Typography;
function UsersTab() {
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState(null);
  const [statusFilter, setStatusFilter] = useState(null);
  const [isCoursesModalVisible, setIsCoursesModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const { data: premiumCourses } = Api.course.findMany.useQuery({
    where: { isPremium: true }
  });
  const { data: userCourses, refetch: refetchUserCourses } = Api.userCourse.findMany.useQuery(
    { where: { userId: selectedUser == null ? void 0 : selectedUser.id }, include: { course: true } },
    { enabled: !!(selectedUser == null ? void 0 : selectedUser.id) }
  );
  const { mutateAsync: enrollUser } = Api.userCourse.create.useMutation();
  const { mutateAsync: unenrollUser } = Api.userCourse.delete.useMutation();
  const {
    data: users,
    isLoading,
    refetch
  } = Api.user.findMany.useQuery({
    where: {
      AND: [
        roleFilter ? { globalRole: roleFilter } : {},
        statusFilter ? { status: statusFilter } : {},
        {
          OR: [
            { name: { contains: searchQuery } },
            { email: { contains: searchQuery } }
          ]
        }
      ]
    }
  });
  const { mutateAsync: updateUser } = Api.user.update.useMutation();
  const { mutateAsync: deleteUser } = Api.user.delete.useMutation();
  const handleStatusChange = async (userId, newStatus) => {
    try {
      await updateUser({
        where: { id: userId },
        data: { status: newStatus }
      });
      message.success("User status updated successfully");
      refetch();
    } catch (error) {
      message.error("Failed to update user status");
    }
  };
  const handleRoleChange = async (userId, newRole) => {
    try {
      await updateUser({
        where: { id: userId },
        data: { globalRole: newRole }
      });
      message.success("User role updated successfully");
      refetch();
    } catch (error) {
      message.error("Failed to update user role");
    }
  };
  const handleDelete = async (userId) => {
    try {
      await deleteUser({ where: { id: userId } });
      message.success("User deleted successfully");
      refetch();
    } catch (error) {
      message.error("Failed to delete user");
    }
  };
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name"
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email"
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status, record) => /* @__PURE__ */ jsxs(
        Select,
        {
          value: status,
          onChange: (value) => handleStatusChange(record.id, value),
          style: { width: 120 },
          children: [
            /* @__PURE__ */ jsx(Select.Option, { value: "INVITED", children: "Invited" }),
            /* @__PURE__ */ jsx(Select.Option, { value: "VERIFIED", children: "Verified" })
          ]
        }
      )
    },
    {
      title: "Role",
      dataIndex: "globalRole",
      key: "globalRole",
      render: (role, record) => /* @__PURE__ */ jsxs(
        Select,
        {
          value: role,
          onChange: (value) => handleRoleChange(record.id, value),
          style: { width: 120 },
          children: [
            /* @__PURE__ */ jsx(Select.Option, { value: "USER", children: "User" }),
            /* @__PURE__ */ jsx(Select.Option, { value: "PREMIUM", children: "Premium" }),
            /* @__PURE__ */ jsx(Select.Option, { value: "ADMIN", children: "Admin" })
          ]
        }
      )
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date) => dayjs(date).format("YYYY-MM-DD HH:mm")
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ jsx(
          Button,
          {
            onClick: () => {
              setSelectedUser(record);
              setIsCoursesModalVisible(true);
            },
            children: "Courses"
          }
        ),
        /* @__PURE__ */ jsx(
          Button,
          {
            onClick: () => handleStatusChange(
              record.id,
              record.status === "VERIFIED" ? "INVITED" : "VERIFIED"
            ),
            children: record.status === "VERIFIED" ? "Suspend" : "Activate"
          }
        ),
        /* @__PURE__ */ jsx(Button, { danger: true, onClick: () => handleDelete(record.id), children: "Delete" })
      ] })
    }
  ];
  return /* @__PURE__ */ jsxs("div", { className: "p-4", children: [
    /* @__PURE__ */ jsx(Title$8, { level: 3, children: "Users Management" }),
    /* @__PURE__ */ jsxs("div", { className: "flex gap-4 mb-4", children: [
      /* @__PURE__ */ jsx(
        Select,
        {
          placeholder: "Filter by role",
          allowClear: true,
          style: { width: 200 },
          onChange: (value) => setRoleFilter(value),
          options: [
            { label: "User", value: "USER" },
            { label: "Premium", value: "PREMIUM" },
            { label: "Admin", value: "ADMIN" }
          ]
        }
      ),
      /* @__PURE__ */ jsx(
        Select,
        {
          placeholder: "Filter by status",
          allowClear: true,
          style: { width: 200 },
          onChange: (value) => setStatusFilter(value),
          options: [
            { label: "Invited", value: "INVITED" },
            { label: "Verified", value: "VERIFIED" }
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsx(
      Input.Search,
      {
        placeholder: "Search by name or email",
        onChange: (e) => setSearchQuery(e.target.value),
        className: "mb-4",
        allowClear: true
      }
    ),
    /* @__PURE__ */ jsx(
      Table,
      {
        columns,
        dataSource: users,
        rowKey: "id",
        loading: isLoading,
        pagination: { pageSize: 10 },
        scroll: { x: true }
      }
    ),
    /* @__PURE__ */ jsx(
      Modal,
      {
        title: "Manage User Courses",
        open: isCoursesModalVisible,
        onCancel: () => setIsCoursesModalVisible(false),
        footer: null,
        children: premiumCourses == null ? void 0 : premiumCourses.map((course) => /* @__PURE__ */ jsxs(
          "div",
          {
            className: "flex justify-between items-center mb-4",
            children: [
              /* @__PURE__ */ jsx("span", { children: course.title }),
              /* @__PURE__ */ jsx(
                Select,
                {
                  value: userCourses == null ? void 0 : userCourses.some((uc) => uc.courseId === course.id),
                  onChange: async (value) => {
                    if (value) {
                      await enrollUser({
                        data: { courseId: course.id, userId: selectedUser.id }
                      });
                    } else {
                      await unenrollUser({
                        where: { courseId: course.id, userId: selectedUser.id }
                      });
                    }
                    refetchUserCourses();
                  },
                  options: [
                    { label: "Yes", value: true },
                    { label: "No", value: false }
                  ]
                }
              )
            ]
          },
          course.id
        ))
      }
    )
  ] });
}
const { Title: Title$7 } = Typography;
function AdminControlPanel() {
  const { checkRole } = useUserContext();
  const navigate = useNavigate();
  useEffect(() => {
    if (!checkRole("ADMIN")) {
      navigate("/skillfeed");
    }
  }, [checkRole]);
  const items = [
    {
      key: "users",
      label: "Users",
      children: /* @__PURE__ */ jsx(UsersTab, {})
    },
    {
      key: "premium",
      label: "Premium Upgrade",
      children: /* @__PURE__ */ jsx(PremiumUpgradeTab, {})
    },
    {
      key: "courses",
      label: "Courses",
      children: /* @__PURE__ */ jsx(CoursesTab, {})
    },
    {
      key: "skillfeed",
      label: "Skillfeed",
      children: /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(Title$7, { level: 3, children: "Skillfeed Management" }),
        /* @__PURE__ */ jsx(SkillFeedTab, {})
      ] })
    }
  ];
  return /* @__PURE__ */ jsx(PageLayout, { layout: "full-width", children: /* @__PURE__ */ jsxs("div", { className: "p-4", children: [
    /* @__PURE__ */ jsx(Title$7, { level: 2, children: "Admin Control Panel" }),
    /* @__PURE__ */ jsx(Tabs, { items })
  ] }) });
}
const route4 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: AdminControlPanel
}, Symbol.toStringTag, { value: "Module" }));
const { Title: Title$6, Text: Text$6 } = Typography;
function CourseDetailsPage() {
  var _a2;
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { user } = useUserContext();
  const [isDropModalVisible, setIsDropModalVisible] = useState(false);
  const [isDropLoading, setIsDropLoading] = useState(false);
  const { mutateAsync: dropCourse } = Api.userCourse.delete.useMutation();
  const { data: enrollment, isLoading: isEnrollmentLoading } = Api.userCourse.findFirst.useQuery({
    where: { courseId, userId: user.id }
  });
  const {
    data: course,
    isLoading,
    isLoading: isCourseLoading
  } = Api.course.findUnique.useQuery({
    where: { id: courseId },
    include: { sections: { include: { videos: true } } }
  });
  if (isLoading || isEnrollmentLoading) {
    return /* @__PURE__ */ jsx(PageLayout, { layout: "full-width", children: /* @__PURE__ */ jsx("div", { style: { textAlign: "center", padding: "50px" }, children: /* @__PURE__ */ jsx(Spin, { size: "large" }) }) });
  }
  return /* @__PURE__ */ jsxs(PageLayout, { layout: "full-width", children: [
    /* @__PURE__ */ jsxs("div", { className: "mt-5", children: [
      /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(
        ImageOptimizedClient.Img,
        {
          src: course == null ? void 0 : course.previewUrl,
          srcOnError: "/images/course-fallback.jpg",
          isPretty: true,
          styleWrapper: {
            position: "relative",
            maxWidth: "100%",
            height: "auto",
            aspectRatio: "16/9"
          },
          styleImg: {
            objectFit: "cover",
            objectPosition: "center",
            width: "100%",
            height: "100%"
          }
        }
      ) }),
      /* @__PURE__ */ jsxs("div", { className: "px-5", children: [
        /* @__PURE__ */ jsx(Title$6, { level: 2, children: course == null ? void 0 : course.title }),
        /* @__PURE__ */ jsx(Text$6, { children: course == null ? void 0 : course.description })
      ] }),
      /* @__PURE__ */ jsx(
        List,
        {
          className: "mt-8",
          dataSource: (_a2 = course == null ? void 0 : course.sections) == null ? void 0 : _a2.sort((a, b) => a.order - b.order),
          renderItem: (section) => {
            var _a3;
            return /* @__PURE__ */ jsx(List.Item, { children: /* @__PURE__ */ jsx(Card, { title: section.title, children: /* @__PURE__ */ jsx(
              List,
              {
                dataSource: (_a3 = section.videos) == null ? void 0 : _a3.sort((a, b) => a.order - b.order),
                renderItem: (video) => /* @__PURE__ */ jsx(List.Item, { children: /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx(Title$6, { level: 5, children: video.title }),
                  /* @__PURE__ */ jsx("div", { className: "mt-4", children: /* @__PURE__ */ jsx(
                    "iframe",
                    {
                      src: video.embedLink.replace(
                        /(youtube\.com\/watch\?v=|youtu\.be\/)([\w-]+)/,
                        "youtube.com/embed/$2"
                      ),
                      style: {
                        width: "100vw",
                        height: "56.25vw",
                        maxHeight: "90vh",
                        margin: "0 -24px",
                        position: "relative",
                        zIndex: 1
                      },
                      frameBorder: "0",
                      allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",
                      allowFullScreen: true
                    }
                  ) }),
                  /* @__PURE__ */ jsx(Text$6, { className: "mt-4", children: video.description })
                ] }) })
              }
            ) }) });
          }
        }
      ),
      enrollment && /* @__PURE__ */ jsx(Flex, { justify: "center", className: "w-full", children: /* @__PURE__ */ jsx(
        Button,
        {
          type: "primary",
          danger: true,
          onClick: () => setIsDropModalVisible(true),
          style: { marginTop: "20px" },
          children: "Drop Course"
        }
      ) })
    ] }),
    /* @__PURE__ */ jsx(
      Modal,
      {
        title: "Drop Course",
        open: isDropModalVisible,
        confirmLoading: isDropLoading,
        onOk: async () => {
          setIsDropLoading(true);
          try {
            await dropCourse({ where: { id: enrollment == null ? void 0 : enrollment.id } });
            message.success("Course dropped successfully");
            navigate("/my-courses");
          } catch (error) {
            console.error("Drop course error:", error);
            if (error.code === "NOT_FOUND") {
              message.error(
                "Course enrollment not found. The course may have already been dropped."
              );
            } else {
              message.error((error == null ? void 0 : error.message) || "Failed to drop course");
            }
          } finally {
            setIsDropLoading(false);
          }
        },
        onCancel: () => setIsDropModalVisible(false),
        children: /* @__PURE__ */ jsx("p", { children: "Are you sure you want to drop this course? This action cannot be undone." })
      }
    )
  ] });
}
const route5 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: CourseDetailsPage
}, Symbol.toStringTag, { value: "Module" }));
const { Text: Text$5 } = Typography;
function ResetPasswordPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [form] = Form.useForm();
  const {
    mutateAsync: resetPassword,
    isLoading,
    isSuccess
  } = Api.authentication.sendResetPasswordEmail.useMutation();
  const handleSubmit = async (values) => {
    try {
      setEmail(values.email);
      await resetPassword({ email: values.email });
    } catch (error) {
      message.error(`Could not reset password: ${error}`);
    }
  };
  return /* @__PURE__ */ jsx(Flex, { align: "center", justify: "center", vertical: true, flex: 1, children: /* @__PURE__ */ jsxs(
    Flex,
    {
      vertical: true,
      style: {
        width: "340px",
        paddingBottom: "100px",
        paddingTop: "100px"
      },
      gap: "middle",
      children: [
        /* @__PURE__ */ jsx(AppHeader, { description: "You will receive a link" }),
        isSuccess && /* @__PURE__ */ jsx(
          Alert,
          {
            style: { textAlign: "center" },
            message: `We sent an email to ${email} with a link to reset your password`,
            type: "success"
          }
        ),
        !isSuccess && /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs(
          Form,
          {
            form,
            onFinish: handleSubmit,
            layout: "vertical",
            requiredMark: false,
            children: [
              /* @__PURE__ */ jsx(
                Form.Item,
                {
                  label: "Email",
                  name: "email",
                  rules: [{ required: true, message: "Email is required" }],
                  children: /* @__PURE__ */ jsx(
                    Input,
                    {
                      type: "email",
                      placeholder: "Your email",
                      autoComplete: "email"
                    }
                  )
                }
              ),
              /* @__PURE__ */ jsx(Form.Item, { children: /* @__PURE__ */ jsx(
                Button,
                {
                  type: "primary",
                  htmlType: "submit",
                  loading: isLoading,
                  block: true,
                  children: "Reset Password"
                }
              ) })
            ]
          }
        ) }),
        /* @__PURE__ */ jsxs(Flex, { justify: "center", align: "center", children: [
          /* @__PURE__ */ jsx(
            Button,
            {
              ghost: true,
              style: { border: "none" },
              onClick: () => navigate("/login"),
              children: /* @__PURE__ */ jsx(Flex, { gap: "small", justify: "center", children: /* @__PURE__ */ jsx(Text$5, { children: "Sign in" }) })
            }
          ),
          /* @__PURE__ */ jsx(Text$5, { type: "secondary", children: "or" }),
          /* @__PURE__ */ jsx(
            Button,
            {
              ghost: true,
              style: { border: "none" },
              onClick: () => navigate("/register"),
              children: /* @__PURE__ */ jsx(Flex, { gap: "small", justify: "center", children: /* @__PURE__ */ jsx(Text$5, { children: "Sign up" }) })
            }
          )
        ] })
      ]
    }
  ) });
}
const route6 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ResetPasswordPage
}, Symbol.toStringTag, { value: "Module" }));
const { Title: Title$5, Text: Text$4 } = Typography;
function MyCoursesPage() {
  const navigate = useNavigate();
  const { user } = useUserContext();
  const {
    data: enrolledCourses,
    isLoading,
    error
  } = Api.userCourse.findMany.useQuery(
    { where: { userId: user == null ? void 0 : user.id }, include: { course: true } },
    {
      onError: (err) => {
        console.error("Failed to fetch enrolled courses:", err);
        message.error("Failed to load your courses. Please try again later.");
      }
    }
  );
  const { data: subscription } = Api.subscription.findFirst.useQuery({
    where: { userId: user == null ? void 0 : user.id }
  });
  const handleContinue = (courseId) => {
    navigate(`/courses/${courseId}`);
  };
  if (error) {
    return /* @__PURE__ */ jsx(PageLayout, { layout: "full-width", children: /* @__PURE__ */ jsx("div", { style: { textAlign: "center", padding: "50px" }, children: /* @__PURE__ */ jsx(Text$4, { type: "danger", children: "Failed to load courses. Please try again later." }) }) });
  }
  if (isLoading) {
    return /* @__PURE__ */ jsx(PageLayout, { layout: "full-width", children: /* @__PURE__ */ jsx("div", { style: { textAlign: "center", padding: "50px" }, children: /* @__PURE__ */ jsx(Spin, { size: "large" }) }) });
  }
  return /* @__PURE__ */ jsx(PageLayout, { layout: "full-width", children: /* @__PURE__ */ jsxs("div", { style: { maxWidth: "1200px", margin: "0 auto", padding: "20px" }, children: [
    /* @__PURE__ */ jsxs("div", { style: { textAlign: "center", marginBottom: "40px" }, children: [
      /* @__PURE__ */ jsxs(Title$5, { level: 2, children: [
        /* @__PURE__ */ jsx("i", { className: "las la-graduation-cap" }),
        " My Courses"
      ] }),
      /* @__PURE__ */ jsx(Text$4, { children: "Continue learning from where you left off" })
    ] }),
    /* @__PURE__ */ jsxs(Row, { gutter: [24, 24], children: [
      enrolledCourses == null ? void 0 : enrolledCourses.map((enrollment) => /* @__PURE__ */ jsx(Col, { xs: 24, sm: 12, md: 8, lg: 8, children: /* @__PURE__ */ jsxs(
        Card,
        {
          hoverable: true,
          cover: /* @__PURE__ */ jsx(
            "img",
            {
              alt: enrollment.course.title || "Course preview",
              src: enrollment.course.previewUrl || "/images/course-fallback.jpg",
              style: { height: "200px", objectFit: "cover" },
              loading: "lazy",
              width: "100%",
              height: "200"
            }
          ),
          children: [
            /* @__PURE__ */ jsx(
              Card.Meta,
              {
                title: enrollment.course.title,
                description: enrollment.course.description
              }
            ),
            /* @__PURE__ */ jsx(
              Button,
              {
                type: "primary",
                block: true,
                style: { marginTop: "16px" },
                onClick: () => handleContinue(enrollment.course.id),
                children: "Continue"
              }
            )
          ]
        }
      ) }, enrollment.id)),
      (enrolledCourses == null ? void 0 : enrolledCourses.length) === 0 && /* @__PURE__ */ jsx(Col, { span: 24, style: { textAlign: "center" }, children: /* @__PURE__ */ jsx(Text$4, { children: "You haven't enrolled in any courses yet." }) })
    ] })
  ] }) });
}
const route7 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: MyCoursesPage
}, Symbol.toStringTag, { value: "Module" }));
const { Paragraph: Paragraph$1, Title: Title$4, Link } = Typography;
const detectUrls = (text) => {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  return text.split(urlRegex).map((part, i) => {
    if (part.match(urlRegex)) {
      return /* @__PURE__ */ jsx(
        Link,
        {
          href: part,
          target: "_blank",
          rel: "noopener noreferrer",
          onClick: (e) => e.stopPropagation(),
          children: part
        },
        i
      );
    }
    return part;
  });
};
const isYoutubeUrl = (url) => {
  return url.includes("youtube.com/watch?v=") || url.includes("youtu.be/");
};
const isTiktokUrl = (url) => {
  return url.includes("tiktok.com");
};
function HomePage() {
  const shuffleArray = (array) => array.sort(() => Math.random() - 0.5);
  const { data: videos } = Api.skillFeedVideo.findMany.useQuery();
  const [shuffledVideos, setShuffledVideos] = useState([]);
  useEffect(() => {
    if (videos) {
      setShuffledVideos(shuffleArray([...videos]));
    }
  }, [videos]);
  const [expandedDescriptions, setExpandedDescriptions] = useState({});
  const toggleDescription = (videoId, event) => {
    event == null ? void 0 : event.preventDefault();
    setExpandedDescriptions((prev) => ({ ...prev, [videoId]: !prev[videoId] }));
  };
  useEffect(() => {
    const loadTikTokScript = () => {
      const script = document.createElement("script");
      script.src = "https://www.tiktok.com/embed.js";
      script.async = true;
      document.body.appendChild(script);
      return () => document.body.removeChild(script);
    };
    loadTikTokScript();
  }, []);
  return /* @__PURE__ */ jsx(PageLayout, { layout: "full-width", children: /* @__PURE__ */ jsx("div", { className: "flex flex-col scroll-smooth snap-y snap-mandatory h-[90vh] overflow-y-scroll mx-[5px]", children: shuffledVideos == null ? void 0 : shuffledVideos.map((video) => /* @__PURE__ */ jsxs(
    "div",
    {
      className: "w-full h-[90vh] flex flex-col justify-center video-container snap-start snap-always",
      children: [
        isYoutubeUrl(video.link) ? /* @__PURE__ */ jsx(
          "iframe",
          {
            src: video.link.replace(
              /(youtube\.com\/watch\?v=|youtu\.be\/)([\w-]+)/,
              "youtube.com/embed/$2"
            ),
            className: "w-full h-[60vh] mx-auto rounded-lg mt-2",
            width: "100%",
            height: "100%",
            allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",
            allowFullScreen: true
          }
        ) : isTiktokUrl(video.link) ? /* @__PURE__ */ jsx(
          "blockquote",
          {
            className: "tiktok-embed mx-auto",
            cite: video.link,
            "data-video-id": video.link.split("/").pop(),
            "data-section": "true",
            style: { width: "325px", height: "90vh" },
            children: /* @__PURE__ */ jsx("section", {})
          }
        ) : /* @__PURE__ */ jsx("div", { className: "text-center text-red-500", children: "Unsupported video format" }),
        /* @__PURE__ */ jsxs("div", { className: "mt-2 mb-4 bg-gray-200 p-4 rounded-lg", children: [
          /* @__PURE__ */ jsx(Title$4, { level: 4, children: video.title }),
          /* @__PURE__ */ jsx(
            Paragraph$1,
            {
              ellipsis: expandedDescriptions[video.id] ? false : { rows: 2 },
              onClick: () => toggleDescription(video.id),
              children: detectUrls(video.description)
            }
          ),
          expandedDescriptions[video.id] && /* @__PURE__ */ jsx(
            Button,
            {
              type: "link",
              onClick: (e) => toggleDescription(video.id, e),
              style: { padding: 0, marginTop: "8px" },
              children: "Read Less"
            }
          )
        ] })
      ]
    },
    video.id
  )) }) });
}
const route8 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: HomePage
}, Symbol.toStringTag, { value: "Module" }));
const singleton = globalThis;
if (!singleton.prisma) {
  singleton.prisma = new PrismaClient({
    log: ["error"]
  });
}
const Database = singleton.prisma;
const COOKIE_MAX_AGE = 60 * 60 * 24 * 30;
const isProduction = process.env.NODE_ENV === "production";
const getCookie = (req, name, options) => {
  const cookieHeader = req.headers.get("Cookie");
  if (!cookieHeader) {
    return "";
  }
  const cookies = cookie.parse(cookieHeader, options);
  return cookies[name];
};
const setCookie = (resHeaders, name, value, options) => {
  resHeaders.set(
    "Set-Cookie",
    cookie.serialize(name, value, {
      maxAge: COOKIE_MAX_AGE,
      httpOnly: true,
      secure: isProduction,
      path: "/",
      sameSite: "lax",
      ...options
    })
  );
};
const setCookieOnResponse = (response, name, value, options) => {
  response.setHeader(
    "Set-Cookie",
    cookie.serialize(name, value, {
      maxAge: COOKIE_MAX_AGE,
      httpOnly: true,
      secure: isProduction,
      path: "/",
      sameSite: "lax",
      ...options
    })
  );
};
const deleteCookie = (resHeaders, name, options) => {
  resHeaders.set(
    "Set-Cookie",
    cookie.serialize(name, "", {
      maxAge: 0,
      httpOnly: true,
      secure: isProduction,
      path: "/",
      sameSite: "lax",
      ...options
    })
  );
};
const Cookies = {
  get: getCookie,
  set: setCookie,
  setOnResponse: setCookieOnResponse,
  delete: deleteCookie
};
const getSession = async (options) => {
  let user;
  try {
    const token = options.accessToken;
    if (!token) {
      throw new Error("No token found");
    }
    const { userId } = Jwt.verify(
      token,
      process.env.SERVER_AUTHENTICATION_SECRET
    );
    user = await Database.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        globalRole: true
      }
    });
    return { user, userId };
  } catch (error) {
    return {};
  }
};
const getPrisma = (session) => {
  const databaseProtected = enhance(Database, { user: session.user });
  return {
    database: databaseProtected,
    databaseUnprotected: Database,
    prisma: databaseProtected,
    masterPrisma: Database
  };
};
const createTrpcContext = async (options) => {
  const accessToken = Cookies.get(options.req, "MARBLISM_ACCESS_TOKEN");
  const session = await getSession({ accessToken });
  const prisma = getPrisma(session);
  return {
    session,
    request: options.req,
    responseHeaders: options.resHeaders,
    ...prisma
  };
};
const createHttpContext = async (options) => {
  const accessToken = Cookies.get(options.request, "MARBLISM_ACCESS_TOKEN");
  const session = await getSession({ accessToken });
  const prisma = getPrisma(session);
  return {
    session,
    ...prisma
  };
};
const createContext = async (options) => {
  return await createTrpcContext(options);
};
const trpcInstance = initTRPC.context().create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError: error.cause instanceof ZodError ? error.cause.flatten() : null
      }
    };
  }
});
const middlewareAuthenticated = trpcInstance.middleware(({ ctx, next }) => {
  if (!ctx.session.user) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "You must be authenticated"
    });
  }
  return next();
});
const procedurePublic = trpcInstance.procedure;
const procedure = procedurePublic.use(middlewareAuthenticated);
const Trpc = {
  createRouter: trpcInstance.router,
  mergeRouters: trpcInstance.mergeRouters,
  procedurePublic,
  procedure,
  createContext
};
var DateHelper;
((DateHelper2) => {
  function getNow() {
    return /* @__PURE__ */ new Date();
  }
  DateHelper2.getNow = getNow;
  function addMinutes(date, minutes) {
    const dateUpdated = new Date(date.getTime());
    const seconds = minutes * 60;
    const milliseconds = seconds * 1e3;
    dateUpdated.setTime(dateUpdated.getTime() + milliseconds);
    return dateUpdated;
  }
  DateHelper2.addMinutes = addMinutes;
  function isBefore(dateBefore, dateAfter) {
    return dateBefore < dateAfter;
  }
  DateHelper2.isBefore = isBefore;
})(DateHelper || (DateHelper = {}));
class UploadProvider {
  initialise() {
    return;
  }
  ensureFilename(filenameBefore) {
    const filenameClean = filenameBefore.replace(/[^\w.]/gi, "");
    const timestamp = DateHelper.getNow().getTime();
    return `${timestamp}-${filenameClean}`;
  }
}
const ONE_HOUR_IN_SECONDS = 60 * 60;
const _UploadProviderAws = class _UploadProviderAws extends UploadProvider {
  constructor() {
    super(...arguments);
    __publicField(this, "client");
    __publicField(this, "bucketNamePublic");
    __publicField(this, "bucketNamePrivate");
    __publicField(this, "region");
    __publicField(this, "credentials");
    __publicField(this, "marblismApiKey");
    __publicField(this, "bucketKey");
    __publicField(this, "httpClient", axios.create());
    __publicField(this, "httpClientOptions", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      }
    });
  }
  async initialise() {
    this.region = process.env.SERVER_UPLOAD_AWS_REGION;
    if (Utility.isNull(this.region)) {
      this.region = "us-west-1";
    }
    try {
      this.marblismApiKey = process.env.SERVER_UPLOAD_MARBLISM_API_KEY;
      if (Utility.isDefined(this.marblismApiKey)) {
        if (_UploadProviderAws.isMarblismInitialised) {
          return;
        }
        await this.initializeWithMarblism();
        console.log(`AWS library (Marblism) active in region ${this.region}`);
        _UploadProviderAws.isMarblismInitialised = true;
        return;
      }
    } catch (error) {
      console.warn(`AWS library (Marblism) failed to start: ${error.message}`);
    }
    try {
      const accessKey = process.env.SERVER_UPLOAD_AWS_ACCESS_KEY;
      const secretKey = process.env.SERVER_UPLOAD_AWS_SECRET_KEY;
      if (!accessKey && !secretKey) {
        throw new Error(
          "Set SERVER_UPLOAD_AWS_ACCESS_KEY && SERVER_UPLOAD_AWS_SECRET_KEY in your .env to activate"
        );
      }
      if (!accessKey) {
        throw new Error(
          "Set SERVER_UPLOAD_AWS_ACCESS_KEY in your .env to activate"
        );
      }
      if (!secretKey) {
        throw new Error(
          "Set SERVER_UPLOAD_AWS_SECRET_KEY in your .env to activate"
        );
      }
      this.bucketNamePublic = process.env.SERVER_UPLOAD_AWS_BUCKET_PUBLIC_NAME;
      if (!this.bucketNamePublic) {
        console.warn(
          `Set SERVER_UPLOAD_AWS_BUCKET_PUBLIC_NAME in your .env to activate a public bucket with infinite urls`
        );
      }
      this.bucketNamePrivate = process.env.SERVER_UPLOAD_AWS_BUCKET_PRIVATE_NAME;
      if (!this.bucketNamePrivate) {
        console.warn(
          `Set SERVER_UPLOAD_AWS_BUCKET_PRIVATE_NAME in your .env to activate a private bucket with signed urls`
        );
      }
      this.client = new S3Client({
        region: this.region,
        credentials: {
          accessKeyId: accessKey,
          secretAccessKey: secretKey
        }
      });
      await this.check();
      console.log(`AWS library active in region ${this.region}`);
    } catch (error) {
      console.warn(`AWS library failed to start`);
      throw new Error(error);
    }
  }
  async initializeWithMarblism() {
    const url = `/v1/addons/upload/create-credentials`;
    this.setApiKey(this.marblismApiKey);
    const response = await this.postMarblism(url);
    this.bucketNamePrivate = response.bucketNamePrivate;
    this.bucketNamePublic = `${response.bucketNamePublic}`;
    this.credentials = {
      accessKeyId: response.accessKeyId,
      secretAccessKey: response.secretAccessKey,
      sessionToken: response.sessionToken,
      expiration: new Date(response.expiration)
    };
    this.bucketKey = response.bucketKey;
    this.client = new S3Client({
      region: this.region,
      credentials: {
        accessKeyId: this.credentials.accessKeyId,
        secretAccessKey: this.credentials.secretAccessKey,
        sessionToken: this.credentials.sessionToken
      }
    });
    await this.check();
  }
  async ensureCredentials() {
    if (!_UploadProviderAws.isMarblismInitialised) {
      return;
    }
    if (this.areCredentialsValid()) {
      return;
    }
    const url = `/v1/addons/upload/refresh-credentials`;
    this.setApiKey(this.marblismApiKey);
    const response = await this.postMarblism(url);
    this.credentials = {
      accessKeyId: response.accessKeyId,
      secretAccessKey: response.secretAccessKey,
      sessionToken: response.sessionToken,
      expiration: new Date(response.expiration)
    };
    this.client = new S3Client({
      region: this.region,
      credentials: {
        accessKeyId: this.credentials.accessKeyId,
        secretAccessKey: this.credentials.secretAccessKey,
        sessionToken: this.credentials.sessionToken
      }
    });
    await this.check();
  }
  areCredentialsValid() {
    const isTokenDefined = Utility.isDefined(this.credentials);
    const isTokenValid = isTokenDefined && DateHelper.isBefore(DateHelper.getNow(), this.credentials.expiration);
    return isTokenValid;
  }
  async check() {
    const buckets = await this.listBuckets();
    if (this.bucketNamePrivate) {
      console.log(`Checking bucket "${this.bucketNamePrivate}"...`);
      const bucket = buckets.find(
        (bucket2) => bucket2.name === this.bucketNamePrivate
      );
      if (bucket) {
        console.log(`Bucket "${this.bucketNamePrivate}" is active`);
      } else {
        throw new Error(`Bucket "${this.bucketNamePrivate}" was not found`);
      }
    }
    if (this.bucketNamePublic) {
      console.log(`Checking bucket "${this.bucketNamePublic}"...`);
      const bucket = buckets.find(
        (bucket2) => bucket2.name === this.bucketNamePublic
      );
      if (bucket) {
        console.log(`Bucket "${this.bucketNamePublic}" is active`);
      } else {
        throw new Error(`Bucket "${this.bucketNamePublic}" was not found`);
      }
    }
  }
  async uploadPublic(options) {
    await this.ensureCredentials();
    const { file } = options;
    let key = this.ensureFilename(file.name);
    key = this.ensureKey(key);
    const command = new PutObjectCommand({
      Bucket: `${this.bucketNamePublic}`,
      Key: key,
      Body: file.buffer,
      ContentType: file.mimetype
    });
    try {
      await this.client.send(command);
      console.log(`File ${file.name} saved (public)`);
      const url = `${this.getBaseUrlPublic()}/${key}`;
      return { url };
    } catch (error) {
      console.error(`${error}`);
      throw new Error(`Could not upload public file with key "${key}"`);
    }
  }
  async uploadPrivate(options) {
    await this.ensureCredentials();
    const { file } = options;
    const key = this.ensureFilename(file.name);
    const command = new PutObjectCommand({
      Bucket: `${this.bucketNamePrivate}`,
      Key: this.ensureKey(key),
      Body: file.buffer,
      ContentType: file.mimetype
    });
    try {
      await this.client.send(command);
      console.log(`File ${file.name} saved (private)`);
      const url = `${this.getBaseUrlPrivate()}/${key}`;
      return { url };
    } catch (error) {
      console.error(`${error}`);
      throw new Error(`Could not upload private file with key "${key}"`);
    }
  }
  async fromPrivateToPublicUrl({
    url,
    expiresInSeconds = ONE_HOUR_IN_SECONDS
  }) {
    if (!this.isUrlPrivate(url)) {
      throw new Error(`${url} must be a private url`);
    }
    await this.ensureCredentials();
    const key = this.extractKeyFromUrlPrivate(url);
    const params = {
      Bucket: `${this.bucketNamePrivate}`,
      Key: this.ensureKey(key)
    };
    const command = new GetObjectCommand(params);
    const urlPublic = await getSignedUrl(this.client, command, {
      expiresIn: expiresInSeconds
    });
    return { url: urlPublic };
  }
  async getSignedUrl(options) {
    const { key, lifetimeSeconds = ONE_HOUR_IN_SECONDS } = options;
    const keyCleaned = this.ensureKey(key);
    const params = {
      Bucket: `${this.bucketNamePrivate}`,
      Key: keyCleaned
    };
    const headCommand = new HeadObjectCommand(params);
    try {
      await this.client.send(headCommand);
    } catch (error) {
      if (error.name === "NotFound") {
        return null;
      } else {
        throw new Error(`Error in checking object existence: ${error}`);
      }
    }
    const command = new GetObjectCommand(params);
    try {
      const url = await getSignedUrl(this.client, command, {
        expiresIn: lifetimeSeconds
      });
      return { url };
    } catch (error) {
      throw new Error(`Error in getting signed url:${error}`);
    }
  }
  /* -------------------------------------------------------------------------- */
  /*                                   PRIVATE                                  */
  /* -------------------------------------------------------------------------- */
  async listBuckets() {
    const result = await this.client.send(new ListBucketsCommand({}));
    const buckets = result.Buckets.map((item) => ({
      name: item.Name,
      dateCreation: item.CreationDate
    }));
    return buckets;
  }
  getBaseUrlPrivate() {
    return `https://${this.bucketNamePrivate}.s3.${this.region}.amazonaws.com`;
  }
  getBaseUrlPublic() {
    return `https://${this.bucketNamePublic}.s3.${this.region}.amazonaws.com`;
  }
  ensureKey(key) {
    let keyClean = key;
    const isPrefixedSlash = keyClean.startsWith("/");
    if (isPrefixedSlash) {
      keyClean = keyClean.slice(1);
    }
    const isPrefixedBucketKey = keyClean.startsWith(this.bucketKey);
    if (!isPrefixedBucketKey) {
      keyClean = `${this.bucketKey}/${keyClean}`;
    }
    return keyClean;
  }
  isUrlPrivate(url) {
    const baseUrlPrivate = this.getBaseUrlPrivate();
    const isPrivate = url.startsWith(baseUrlPrivate);
    return isPrivate;
  }
  extractKeyFromUrlPrivate(url) {
    const baseUrlPrivate = this.getBaseUrlPrivate();
    return url.replace(baseUrlPrivate, "");
  }
  setApiKey(apiKey) {
    this.httpClientOptions.headers["Authorization"] = apiKey;
    this.httpClientOptions["credentials"] = "include";
  }
  async postMarblism(url) {
    const baseUrl = this.getDashboardBaseUrl();
    const response = await this.httpClient.post(`${baseUrl}${url}`, {}, this.httpClientOptions).catch((error) => {
      console.error(error);
      throw new Error(`Could not post to ${url}`);
    });
    return response.data;
  }
  getDashboardBaseUrl() {
    return `https://api.marblism.com/api`;
  }
};
__publicField(_UploadProviderAws, "isMarblismInitialised", false);
let UploadProviderAws = _UploadProviderAws;
var FileHelper;
((FileHelper2) => {
  function getRoot() {
    return process.cwd();
  }
  FileHelper2.getRoot = getRoot;
  function findFileContent(path) {
    return fs.readFileSync(path, "utf-8");
  }
  FileHelper2.findFileContent = findFileContent;
  function writeFolder(path) {
    fs.mkdirSync(path, { recursive: true });
  }
  FileHelper2.writeFolder = writeFolder;
  async function getFileBuffer(file) {
    return Buffer.from(await file.arrayBuffer());
  }
  FileHelper2.getFileBuffer = getFileBuffer;
  function writeFile(path, content) {
    const pathFolder = path.split("/").slice(0, -1).join("/");
    writeFolder(pathFolder);
    return fs.writeFileSync(path, content);
  }
  FileHelper2.writeFile = writeFile;
  function joinPaths(...paths) {
    return join(...paths);
  }
  FileHelper2.joinPaths = joinPaths;
  function createReadStream(path) {
    return fs.createReadStream(path);
  }
  FileHelper2.createReadStream = createReadStream;
  function buildTemporaryPath(path) {
    const pathTemporary = Path.join(os.tmpdir(), "marblism-tmp", path);
    return pathTemporary;
  }
  FileHelper2.buildTemporaryPath = buildTemporaryPath;
  async function createReadStreamFromArrayBuffer(arrayBuffer, filename) {
    const path = buildTemporaryPath(filename);
    const pathFolder = path.split("/").slice(0, -1).join("/");
    deleteFolder(pathFolder);
    writeFolder(pathFolder);
    fs.writeFileSync(path, Buffer.from(arrayBuffer));
    return fs.createReadStream(path);
  }
  FileHelper2.createReadStreamFromArrayBuffer = createReadStreamFromArrayBuffer;
  async function deleteFile(path) {
    fs.unlinkSync(path);
  }
  FileHelper2.deleteFile = deleteFile;
  function deleteFolder(path) {
    try {
      fs.rmdirSync(path, { recursive: true });
    } catch (error) {
    }
  }
  FileHelper2.deleteFolder = deleteFolder;
  function getFileType(filename, buffer) {
    if (filename.endsWith(".csv")) {
      return "csv";
    }
    if (filename.endsWith(".pdf")) {
      return "pdf";
    }
    if (filename.endsWith(".docx") || filename.endsWith(".doc")) {
      return "docx";
    }
    if (Utility.isNull(buffer)) {
      return "unknown";
    }
    const signatures = {
      pdf: [37, 80, 68, 70],
      docx: [80, 75, 3, 4],
      csv: [34, 44, 10]
    };
    for (const [type, signature] of Object.entries(signatures)) {
      if (signature.every((byte, index) => buffer[index] === byte)) {
        return type;
      }
    }
    return "unknown";
  }
  FileHelper2.getFileType = getFileType;
})(FileHelper || (FileHelper = {}));
class UploadProviderLocal extends UploadProvider {
  constructor() {
    super(...arguments);
    __publicField(this, "staticServerUrl");
    __publicField(this, "pathPublicInternal", `./public/upload/public`);
    __publicField(this, "pathPrivateInternal", `./public/upload/private`);
    __publicField(this, "pathPublicExternal", `/upload/public`);
    __publicField(this, "pathPrivateExternal", `/upload/private`);
  }
  initialise() {
    try {
      FileHelper.writeFolder(this.pathPublicInternal);
      this.staticServerUrl = `${Configuration.getBaseUrl()}`;
      console.log(`Upload Local is active`);
    } catch (error) {
      console.error(`Upload Local failed to start: ${error.message}`);
    }
    return;
  }
  async uploadPublic({
    file
  }) {
    const content = file.buffer;
    const filename = this.ensureFilename(file.name);
    const path = FileHelper.joinPaths(this.pathPublicInternal, filename);
    FileHelper.writeFile(path, content);
    const url = `${this.staticServerUrl}${this.pathPublicExternal}/${filename}`;
    return { url };
  }
  async uploadPrivate({
    file
  }) {
    const content = Buffer.from(file.buffer);
    const filename = this.ensureFilename(file.name);
    const path = FileHelper.joinPaths(this.pathPrivateInternal, filename);
    FileHelper.writeFile(path, content);
    const url = `${this.staticServerUrl}${this.pathPrivateExternal}/${filename}`;
    return { url };
  }
  async fromPrivateToPublicUrl({
    url
  }) {
    return { url };
  }
  async getSignedUrl(options) {
    const url = `${this.staticServerUrl}${this.pathPublicExternal}/${options.key}`;
    return { url };
  }
}
let Service$4 = class Service {
  constructor() {
    __publicField(this, "instance");
  }
  async setup() {
    if (this.instance) {
      return;
    }
    try {
      console.log(`Trying using AWS...`);
      const instance = new UploadProviderAws();
      await instance.initialise();
      this.instance = instance;
      return;
    } catch (error) {
      console.warn(`Could not use AWS: ${error.message}`);
    }
    console.log(
      `Falling back on local provider (not recommended for production)`
    );
    try {
      const instance = new UploadProviderLocal();
      await instance.initialise();
      this.instance = instance;
      return;
    } catch (error) {
      console.warn(`Could not use local provider: ${error.message}`);
    }
  }
  async uploadPublic(...files) {
    await this.setup();
    const responses = [];
    for (const file of files) {
      const response = await this.instance.uploadPublic({ file });
      responses.push(response);
    }
    return responses;
  }
  async uploadPrivate(...files) {
    await this.setup();
    const responses = [];
    for (const file of files) {
      const response = await this.instance.uploadPrivate({ file });
      responses.push(response);
    }
    return responses;
  }
  async fromPrivateToPublicUrl(...items) {
    await this.setup();
    const responses = [];
    for (const item of items) {
      const response = await this.instance.fromPrivateToPublicUrl(item);
      responses.push(response);
    }
    return responses;
  }
  async getSignedUrl(options) {
    await this.setup();
    return this.instance.getSignedUrl(options);
  }
};
const UploadService = new Service$4();
const UploadRouter = Trpc.createRouter({
  fromPrivateToPublicUrl: Trpc.procedure.input(
    z.object({
      url: z.string()
    })
  ).mutation(async ({ input }) => {
    const response = await UploadService.fromPrivateToPublicUrl({
      url: input.url
    });
    const url = response[0].url;
    return { url };
  })
});
config();
class Provider {
  constructor() {
    __publicField(this, "name", "google");
    __publicField(this, "strategy");
    this.setup();
  }
  isActive() {
    return !!this.strategy;
  }
  setup() {
    try {
      const clientID = process.env.SERVER_AUTHENTICATION_GOOGLE_CLIENT_ID;
      const clientSecret = process.env.SERVER_AUTHENTICATION_GOOGLE_CLIENT_SECRET;
      const callbackURL = `${Configuration.getBaseUrl()}/api/auth/google/callback`;
      if (Utility.isNull(clientID) || Utility.isNull(clientSecret)) {
        throw new Error(
          `Set SERVER_AUTHENTICATION_GOOGLE_CLIENT_ID AND SERVER_AUTHENTICATION_GOOGLE_CLIENT_SECRET in your .env to activate the Authentication Google provider`
        );
      }
      this.strategy = new Strategy(
        {
          clientID,
          clientSecret,
          callbackURL
        },
        async (accessToken, refreshToken, profile, done) => {
          try {
            const email = profile.emails[0].value;
            let user = await Database.user.findFirst({ where: { email } });
            if (!user) {
              user = await Database.user.create({
                data: {
                  email,
                  name: profile.displayName,
                  pictureUrl: profile.photos[0].value
                }
              });
            }
            const payload = {
              accessToken,
              refreshToken,
              user
            };
            done(null, payload);
          } catch (error) {
            done(error);
          }
        }
      );
      console.log(`Authentication Google provider is active`);
    } catch (error) {
      console.error(
        `Could not setup Authentication Google provider: ${error.message}`
      );
    }
  }
}
const GoogleProvider = new Provider();
const providers = [GoogleProvider];
const getProviders = () => {
  return providers.filter((provider) => provider.isActive());
};
const expressSetup = (app) => {
  app.use(passport.initialize());
  getProviders().forEach((provider) => passport.use(provider.strategy));
  app.get("/api/auth/:provider", (req, res, next) => {
    const provider = req.params.provider;
    passport.authenticate(provider, {
      scope: ["profile", "email"],
      // You can customize scope per provider if needed
      session: false,
      prompt: "select_account"
    })(req, res, next);
  });
  app.get(
    "/api/auth/:provider/callback",
    (req, res, next) => {
      const provider = req.params.provider;
      passport.authenticate(provider, { failureRedirect: "/", session: false })(
        req,
        res,
        next
      );
    },
    (req, res) => {
      const provider = req.params.provider;
      const secret = Configuration.getAuthenticationSecret();
      const jwtToken = Jwt.sign(
        {
          userId: req.user["user"].id,
          [`${provider}AccessToken`]: req.user["accessToken"],
          [`${provider}RefreshToken`]: req.user["refreshToken"]
        },
        secret,
        {
          expiresIn: COOKIE_MAX_AGE
        }
      );
      Cookies.setOnResponse(res, "MARBLISM_ACCESS_TOKEN", jwtToken);
      res.redirect("/");
    }
  );
};
const getHttpContext = async (options) => {
  var _a2, _b2;
  const context = await createHttpContext(options);
  if (!((_b2 = (_a2 = context == null ? void 0 : context.session) == null ? void 0 : _a2.user) == null ? void 0 : _b2.id)) {
    throw new Response("Unauthorized", { status: 401 });
  }
  return context;
};
const getHttpContextPublic = async (options) => {
  const context = await createHttpContext(options);
  return context;
};
class MailjetProvider {
  constructor() {
    __publicField(this, "client");
    __publicField(this, "templateIds", {});
    this.initialise();
  }
  initialise() {
    const isProduction2 = process.env.NODE_ENV === "production";
    if (!isProduction2) {
      console.warn(`Mailjet is running in development mode`);
    }
    try {
      const apiKey = process.env.SERVER_EMAIL_MAILJET_API_KEY;
      const secretKey = process.env.SERVER_EMAIL_MAILJET_SECRET_KEY;
      if (!apiKey || !secretKey) {
        console.warn(`Set SERVER_EMAIL_MAILJET_API_KEY and SERVER_EMAIL_MAILJET_SECRET_KEY to activate Mailjet`);
        return;
      }
      this.client = Mailjet.apiConnect(apiKey, secretKey);
      console.log(`Mailjet service active`);
    } catch (error) {
      console.error(`Could not start Mailjet service`, error);
    }
  }
  async send(options) {
    if (!options.templateId && !options.content) {
      throw new Error("Either templateId or content must be provided");
    }
    const message2 = this.buildMessage(options);
    return this.client.post("send", { version: "v3.1" }).request({
      Messages: [message2]
    }).then((result) => {
      console.log(`Emails sent`, result.body);
    }).catch((error) => {
      var _a2;
      console.error(`Could not send emails (${error.statusCode}):`, (_a2 = error.response) == null ? void 0 : _a2.body);
    });
  }
  buildMessage(options) {
    const from = {
      Email: "mbiyber@gmail.com",
      Name: "SKILLFLOW"
    };
    const to = options.to.map((item) => ({ Email: item.email, Name: item.name }));
    const message2 = {
      From: from,
      To: to,
      Subject: options.subject
    };
    if (options.templateId) {
      message2.TemplateLanguage = true;
      message2.TemplateID = options.templateId;
      message2.Variables = options.variables;
    } else {
      message2.HTMLPart = options.content;
    }
    return message2;
  }
}
class NodemailerProvider {
  constructor() {
    __publicField(this, "client");
    this.initialise();
  }
  initialise() {
    try {
      const host = process.env.SERVER_EMAIL_MAILPIT_HOST ?? "localhost";
      const port = Number(process.env.SERVER_EMAIL_MAILPIT_PORT ?? 1022);
      this.client = NodemailerSDK.createTransport({
        host,
        port
      });
      console.log(`Nodemailer is active (${host}:${port})`);
    } catch (error) {
      console.error(`Nodemailer failed to start: ${error.message}`);
    }
  }
  async send(options) {
    for (const to of options.to) {
      await this.client.sendMail({
        from: `Marblism <no-reply@marblism.com>`,
        to: to.email,
        subject: options.subject,
        html: options.content
      }).then((result) => {
        console.log(`Emails sent`);
      }).catch((error) => {
        console.error(`Could not send emails (${error.statusCode})`);
        console.error(error);
      });
    }
  }
}
const TemplateBase = `
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Marblism</title>
    <style>
      {{ style }}
    </style>
  </head>
  <body>
    <div class="card">{{ content }}</div>
  </body>
</html>
  `.trim();
const TemplateComponents = {
  "<Card>": `
      <div class="card">
    `.trim(),
  "</Card>": "</div>",
  "<Card.Header>": `
      <table 
        class="card-header"
        cellpadding="0" 
        cellspacing="0" 
        style="border-collapse:separate;border-spacing:0;table-layout:fixed;width:100%;text-align:center"
      >
        <tbody>
    `.trim(),
  "</Card.Header>": "</tbody></table>",
  "<Card.Body>": `
      <table 
        class="card-body"
        cellpadding="0" 
        cellspacing="0" 
        style="border-collapse:separate;border-spacing:0;table-layout:fixed;width:100%"
      >
        <tbody>
    `.trim(),
  "</Card.Body>": "</tbody></table>",
  "<Card.Footer>": `
      <table 
        class="card-footer"
        cellpadding="0" 
        cellspacing="0" 
        style="border-collapse:separate;border-spacing:0;table-layout:fixed;width:100%;text-align:center"
      >
        <tbody>
    `.trim(),
  "</Card.Footer>": "</tbody></table>",
  "<p>": "<tr><td><p>",
  "</p>": "</p></td></tr>",
  "<h2>": "<tr><td><h2>",
  "</h2>": "</h2></td></tr>",
  "<hr />": "<tr><td><hr /></td></tr>"
};
const TemplateInvitationToOrganization = `
<Card.Header>
  <h2>Welcome to SKILLFLOW</h2>
  <hr />
</Card.Header>

<Card.Body>
  <p>You have been invited to join {{ organization_name }}.</p>
  <p>
    <a href="{{ url_invitation }}" target="_blank">Accept Invitation</a>
  </p>
</Card.Body>

<Card.Footer>
  <p>Sent by SKILLFLOW</p>
</Card.Footer>
  `.trim();
const TemplateResetPassword = `
<Card.Header>
  <h2>Password Reset</h2>
  <hr />
</Card.Header>

<Card.Body>
  <p>We received a request to reset your password.</p>
  <p>Click the button below to reset it</p>
  <p>
    <a href="{{ url_password_reset }}" target="_blank">Reset Password</a>
  </p>
  <p>If you did not request a password reset, ignore this email.</p>
</Card.Body>

<Card.Footer>
  <p>Sent by SKILLFLOW</p>
</Card.Footer>
  `.trim();
const TemplateStyle = `
  body {
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
    line-height: 1.6;
    color: rgba(41, 41, 41, 1);
  }

  .card {
    max-width: 600px;
    margin: 20px auto;
    border: 1px solid #ddd;
    border-radius: 4px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    font-size: 16px;
  }

  h1,
  h2,
  h3 {
    font-weight: 700;
    text-transform: uppercase;
    color: black;
  }

  p {
    width: 100%;
  }

  .card-header,
  .card-body,
  .card-footer {
    padding-top: 28px;
    padding-left: 40px;
    padding-right: 40px;
  }

  .card-body,
  .card-footer {
    padding-bottom: 28px;
  }

  .card-body {
    color: rgba(41, 41, 41, 1);
  }

  .card-footer {
    color: white;
    font-size: 13px;
    background: black;
  }

  hr {
    width: 100%;
    border-top: 1px solid black;
  }

  .badge,
  a {
    color: #4f4f4f;
    background: white;
    font-size: 16px;
    font-weight: 700;
    padding: 12px 16px 12px 16px;
    border: 1px solid grey;
    border-radius: 4px;
    text-decoration: none;
  }

  a {
    cursor: pointer;
  }

  a:hover {
    color: black;
    border-color: black;
  }

  td {
    width: 100%;
  }
`;
const TemplateVerificationCode = `
<Card.Header>
  <h2>Single-use verification code</h2>
  <hr />
</Card.Header>

<Card.Body>
  <p>
    You are receiving this e-mail because a request has been made for a unique
    code
  </p>
  <p>Enter the following code for verification</p>
  <p>
    <span class="badge">{{ code }}</span>
  </p>
  <p>Code expires in {{ expiration }}</p>
</Card.Body>

<Card.Footer>
  <p>Sent bY SKILLFLOW</p>
</Card.Footer>
  `.trim();
const TemplateWelcome = `
<Card.Header>
  <h2>Welcome to SKILLFLOW</h2>
  <hr />
</Card.Header>

<Card.Body>
  <p>Your account is now active.</p>
</Card.Body>

<Card.Footer>
  <p>Sent by SKILLFLOW</p>
</Card.Footer>
  `.trim();
const templates = {
  resetPassword: TemplateResetPassword,
  verificationCode: TemplateVerificationCode,
  welcome: TemplateWelcome,
  invitationToOrganization: TemplateInvitationToOrganization
};
let Service$3 = class Service2 {
  constructor() {
    __publicField(this, "provider");
    __publicField(this, "templates", templates);
    const isProduction2 = process.env.NODE_ENV === "production";
    if (isProduction2) {
      this.provider = new MailjetProvider();
    } else {
      this.provider = new NodemailerProvider();
    }
  }
  async send(options) {
    const content = templates[options.templateKey] ?? options.content;
    const name = options.name ?? options.email;
    const contentBuilt = this.getTemplate({
      content,
      variables: options.variables
    });
    return this.provider.send({
      content: contentBuilt,
      to: [
        {
          name,
          email: options.email
        }
      ],
      variables: options.variables,
      subject: options.subject
    }).then(() => {
      console.log(`Email sent to ${options.email}`, options);
    });
  }
  getTemplate(options) {
    const values = options.variables ?? { content: options.content };
    const contentBase = TemplateBase;
    const contentCSS = TemplateStyle;
    const contentTemplate = options.content;
    let content = this.buildContent(contentTemplate, values);
    content = this.buildContent(contentBase, { style: contentCSS, content });
    content = this.buildComponents(content);
    return content;
  }
  buildContent(content, values) {
    let contentBuilt = content;
    for (const [key, value] of Object.entries(values)) {
      const token = new RegExp(`{{ ${key} }}`, "g");
      contentBuilt = contentBuilt.replace(token, value);
    }
    return contentBuilt;
  }
  buildComponents(content) {
    let contentUpdated = content;
    for (const [key, value] of Object.entries(TemplateComponents)) {
      const tag = new RegExp(`${key}`, "g");
      contentUpdated = contentUpdated.replace(tag, value);
    }
    return contentUpdated;
  }
};
let Singleton$2 = (_a = class {
}, __publicField(_a, "service", new Service$3()), _a);
const EmailService = Singleton$2.service;
const TemplateKeys = Object.keys(EmailService.templates);
const EmailRouter = Trpc.createRouter({
  send: Trpc.procedure.input(
    z.object({
      userId: z.string().optional(),
      email: z.string().optional(),
      name: z.string().optional(),
      subject: z.string(),
      content: z.string().optional(),
      templateKey: z.enum(TemplateKeys).optional(),
      variables: z.record(z.string(), z.string()).optional()
    })
  ).mutation(async ({ input, ctx }) => {
    let user;
    if (input.userId) {
      user = await ctx.database.user.findUniqueOrThrow({
        where: { id: input.userId }
      });
    }
    const email = (user == null ? void 0 : user.email) ?? input.email;
    const name = (user == null ? void 0 : user.name) ?? input.name;
    await EmailService.send({
      templateKey: input.templateKey,
      content: input.content,
      email,
      name,
      subject: input.subject,
      variables: input.variables
    });
    return {};
  })
});
var EmailServer;
((EmailServer2) => {
  EmailServer2.service = EmailService;
  EmailServer2.trpcRouter = EmailRouter;
})(EmailServer || (EmailServer = {}));
const mailjetClient = Mailjet.apiConnect(
  process.env.SERVER_EMAIL_MAILJET_API_KEY,
  process.env.SERVER_EMAIL_MAILJET_SECRET_KEY
);
async function sendEmail(email, password, name) {
  try {
    const request = mailjetClient.post("send", { version: "v3.1" }).request({
      Messages: [
        {
          From: {
            Email: process.env.MAILJET_FROM_EMAIL,
            Name: process.env.MAILJET_FROM_NAME
          },
          To: [{ Email: email, Name: "New User" }],
          Subject: "Welcome to SKILLFLOW",
          TextPart: `Welcome ${name}! Here is your temporary password: ${password}`,
          HTMLPart: `<h3>Welcome to SKILLFLOW</h3>
          <p>We're excited to have you on board ${name}!</p>
          <p>Your temporary password: <strong>${password}</strong></p>
          <br>
          <p>For security reasons, please <a href="https://skillflow.online/login" style="color: #007bff; text-decoration: none;"><strong>sign in now</strong></a> and update your password.</p>
          <br>
          <p>If you need any assistance, feel free to reach out.</p>
          <p>– The SKILLFLOW Team</p>`
        }
      ]
    });
    await request;
    console.log("✅ Email sent successfully");
  } catch (error) {
    console.error("❌ Error sending email:", error);
    throw new Error("Email sending failed");
  }
}
let Service$2 = class Service3 {
  /**
   * This function is called when a new user signs up, you can use it to send a welcome email.
   */
  async onRegistration(ctx, userId, ppw) {
    const user = await ctx.databaseUnprotected.user.findUnique({
      where: { id: userId }
    });
    if (!user) {
      return;
    }
    const email = user.email;
    const name = user.name;
    await sendEmail(email, ppw, name);
  }
  /**
   * Register a new user and trigger the onRegistration logic
   */
  async registerUser(ctx, email, name, password, ppw, tokenInvitation) {
    if (!password || !ppw) {
      throw new Error("Password is required but not received");
    }
    const newUser = await ctx.databaseUnprotected.user.create({
      data: {
        email,
        name,
        password
        // Store the hashed password
      }
    });
    await this.onRegistration(ctx, newUser.id, ppw);
    return newUser;
  }
};
let Singleton$1 = (_b = class {
}, __publicField(_b, "service", new Service$2()), _b);
const AuthenticationService = Singleton$1.service;
const AuthenticationRouter = Trpc.createRouter({
  createAdmin: Trpc.procedurePublic.input(
    z.object({
      email: z.string().email(),
      password: z.string()
    })
  ).mutation(async ({ ctx, input }) => {
    checkPassword(input.password);
    const passwordHashed = hashPassword(input.password);
    const user = await ctx.databaseUnprotected.user.create({
      data: {
        email: "admin@admin.com",
        password: passwordHashed,
        globalRole: "ADMIN",
        status: "VERIFIED"
      }
    });
    return { id: user.id };
  }),
  session: Trpc.procedure.query(async ({ ctx }) => {
    const user = await ctx.database.user.findUniqueOrThrow({
      where: { id: ctx.session.user.id }
    });
    return { user };
  }),
  logout: Trpc.procedurePublic.mutation(async ({ ctx }) => {
    Cookies.delete(ctx.responseHeaders, "MARBLISM_ACCESS_TOKEN");
    ctx.responseHeaders.set("Location", "/");
    return {
      success: true,
      redirect: "/"
    };
  }),
  login: Trpc.procedurePublic.input(
    z.object({
      email: z.string().email(),
      password: z.string()
    })
  ).mutation(async ({ ctx, input }) => {
    try {
      console.log(`Authentication attempt for email: ${input.email}`);
      let user;
      try {
        user = await ctx.databaseUnprotected.user.findUnique({
          where: { email: input.email }
        });
      } catch (error) {
        console.log(`Failed login attempt - user not found: ${input.email}`);
        return {
          success: false,
          code: "USER_NOT_FOUND",
          redirect: "/login?error=UserNotFound"
        };
      }
      if (!user) {
        console.log(`Failed login attempt - user not found: ${input.email}`);
        return {
          success: false,
          code: "USER_NOT_FOUND",
          redirect: "/login?error=UserNotFound"
        };
      }
      if (user.status !== "VERIFIED") {
        console.log(
          `Failed login attempt - user not verified: ${input.email}`
        );
        return {
          success: false,
          code: "USER_NOT_VERIFIED",
          redirect: "/login?error=UserNotVerified"
        };
      }
      const isValid = await Bcrypt.compare(input.password, user.password);
      if (!isValid) {
        console.log(`Failed login attempt - invalid password: ${input.email}`);
        return {
          success: false,
          code: "INVALID_CREDENTIALS",
          redirect: "/login?error=CredentialsSignin"
        };
      }
      const secret = Configuration.getAuthenticationSecret();
      const jwtToken = Jwt.sign({ userId: user.id }, secret, {
        expiresIn: COOKIE_MAX_AGE
      });
      Cookies.set(ctx.responseHeaders, "MARBLISM_ACCESS_TOKEN", jwtToken);
      console.log(`Successful login for user: ${input.email}`);
      return {
        success: true,
        code: "SUCCESS",
        redirect: "/skillfeed"
      };
    } catch (error) {
      console.error(`Login error for ${input.email}:`, error);
      return {
        success: false,
        code: "INTERNAL_ERROR",
        redirect: "/login?error=default"
      };
    }
  }),
  register: Trpc.procedurePublic.input(
    z.object({
      email: z.string().email(),
      name: z.string(),
      pictureUrl: z.string().optional(),
      password: z.string(),
      globalRole: z.string().refine((value) => value !== "ADMIN", {
        message: "globalRole cannot be ADMIN"
      }).optional(),
      tokenInvitation: z.string().optional()
    })
  ).mutation(async ({ ctx, input }) => {
    checkPassword(input.password);
    const payload = checkTokenInvitation(input.tokenInvitation);
    const email = input.email.trim().toLowerCase();
    const ppw = input.password;
    let user;
    if (payload == null ? void 0 : payload.userId) {
      user = await ctx.databaseUnprotected.user.findUnique({
        where: { id: payload.userId, status: "INVITED" }
      });
      if (!user) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "User was not found"
        });
      }
    } else {
      const userExisting = await ctx.databaseUnprotected.user.findUnique({
        where: { email }
      });
      if (userExisting) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "Email is not available"
        });
      }
    }
    const passwordHashed = hashPassword(ppw);
    if (user) {
      user = await ctx.databaseUnprotected.user.update({
        where: { id: user.id },
        data: { ...input, password: passwordHashed, status: "VERIFIED" }
      });
    } else {
      user = await ctx.databaseUnprotected.user.create({
        data: {
          email: input.email,
          name: input.name,
          pictureUrl: input.pictureUrl,
          password: passwordHashed
        }
      });
    }
    await AuthenticationService.onRegistration(ctx, user.id, ppw);
    return { id: user.id, ppw };
  }),
  updatePassword: Trpc.procedure.input(z.object({
    userId: z.string(),
    currentPassword: z.string(),
    newPassword: z.string()
  })).mutation(async ({ ctx, input }) => {
    const { userId, currentPassword, newPassword } = input;
    const user = await ctx.databaseUnprotected.user.findUnique({
      where: { id: userId }
    });
    if (!user) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "User not found"
      });
    }
    const isValid = await Bcrypt.compare(currentPassword, user.password);
    if (!isValid) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Current password is incorrect"
      });
    }
    const passwordHashed = hashPassword(newPassword);
    await ctx.databaseUnprotected.user.update({
      where: { id: user.id },
      data: { password: passwordHashed }
    });
    return { success: true };
  }),
  sendResetPasswordEmail: Trpc.procedurePublic.input(z.object({ email: z.string() })).mutation(async ({ ctx, input }) => {
    const email = input.email.trim().toLowerCase();
    const user = await ctx.databaseUnprotected.user.findUniqueOrThrow({
      where: { email }
    });
    const payload = { userId: user.id };
    const secret = Configuration.getAuthenticationSecret();
    const TIME_24_HOURS = 60 * 60 * 24;
    const token = Jwt.sign(payload, secret, { expiresIn: TIME_24_HOURS });
    const url = Configuration.getBaseUrl();
    const urlResetPassword = `${url}/reset-password/${token}`;
    try {
      await EmailServer.service.send({
        templateKey: "resetPassword",
        email: user.email,
        name: user.name ?? user.email,
        subject: `Reset your password`,
        variables: {
          url_password_reset: urlResetPassword
        }
      });
      return { success: true };
    } catch (error) {
      console.error(error.message);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Could not send the email"
      });
    }
  }),
  resetPassword: Trpc.procedurePublic.input(z.object({ token: z.string(), password: z.string() })).mutation(async ({ ctx, input }) => {
    checkPassword(input.password);
    const secret = Configuration.getAuthenticationSecret();
    let decoded;
    try {
      decoded = Jwt.verify(input.token, secret);
    } catch (error) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "Token is invalid"
      });
    }
    const user = await ctx.databaseUnprotected.user.findUniqueOrThrow({
      where: { id: decoded.userId }
    });
    const passwordHashed = hashPassword(input.password);
    await ctx.databaseUnprotected.user.update({
      where: { id: user.id },
      data: {
        password: passwordHashed
      }
    });
    return { success: true };
  })
});
const checkPassword = (password) => {
  const isValid = (password == null ? void 0 : password.length) >= 6;
  if (isValid) {
    return;
  }
  throw new TRPCError({
    code: "BAD_REQUEST",
    message: "Password must have at least 6 characters."
  });
};
const checkTokenInvitation = (token) => {
  if (Utility.isNull(token)) {
    return;
  }
  const secret = Configuration.getAuthenticationSecret();
  let decoded;
  try {
    decoded = Jwt.verify(token, secret);
  } catch (error) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "Token is invalid"
    });
  }
  return decoded;
};
const hashPassword = (password) => {
  const saltRounds = 10;
  const salt = Bcrypt.genSaltSync(saltRounds);
  const passwordHashed = Bcrypt.hashSync(password, salt);
  return passwordHashed;
};
const AuthenticationServer = {
  createTrpcContext,
  getHttpContext,
  getHttpContextPublic,
  trpcRouter: AuthenticationRouter,
  service: AuthenticationService,
  expressSetup,
  getProviders
};
const MIMETYPE_SUPPORTED = [
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/bmp",
  "image/tiff",
  "image/svg+xml"
];
const compressFile = async (file, options = { quality: 70 }) => {
  try {
    const isSupported = MIMETYPE_SUPPORTED.includes(file.type);
    const arrayBuffer = await file.arrayBuffer();
    if (!isSupported) {
      return {
        buffer: Buffer.from(arrayBuffer),
        filename: file.name,
        mimetype: file.type
      };
    }
    const buffer = await compressArrayBuffer(arrayBuffer, options);
    const filename = rename(file.name);
    return { buffer, mimetype: "image/webp", filename };
  } catch (error) {
    throw new Error(`Could not compress image: ${error.message}`);
  }
};
const compressArrayBuffer = async (arrayBuffer, options = { quality: 70 }) => {
  try {
    const { size, quality } = options;
    const buffer = Buffer.from(arrayBuffer);
    const image = sharp(buffer);
    const { height, width } = await image.metadata();
    const sizeBuilt = size ?? width > height ? width : height;
    const bufferCompressed = await sharp(buffer).resize(sizeBuilt).webp({ quality, effort: 6 }).toBuffer();
    return bufferCompressed;
  } catch (error) {
    throw new Error(`Could not compress image: ${error.message}`);
  }
};
const rename = (name = "") => {
  if (name.includes(".")) {
    const nameWithoutExtension = name.split(".").slice(-1).join(".");
    return `${nameWithoutExtension}.webp`;
  }
  return `${name}.webp`;
};
const ImageOptimizeShared = {
  compressFile,
  compressArrayBuffer
};
const uploadPrivateAction = async ({ request }) => {
  await AuthenticationServer.getHttpContext({ request });
  const schema = zfd.formData({
    file: zfd.file()
  });
  try {
    const formData = await request.formData();
    const data = schema.parse({
      file: formData.get("file")
    });
    const { buffer, mimetype, filename } = await ImageOptimizeShared.compressFile(data.file);
    const file = {
      name: filename,
      mimetype,
      buffer
    };
    const urls = await UploadService.uploadPrivate(file);
    return json(urls == null ? void 0 : urls[0]);
  } catch (error) {
    console.log(error);
    return json(`Could not upload file`, { status: 500 });
  }
};
const uploadPublicAction = async ({ request }) => {
  await AuthenticationServer.getHttpContext({ request });
  const schema = zfd.formData({
    file: zfd.file()
  });
  try {
    const formData = await request.formData();
    const data = schema.parse({
      file: formData.get("file")
    });
    const { buffer, mimetype, filename } = await ImageOptimizeShared.compressFile(data.file);
    const file = {
      name: filename,
      mimetype,
      buffer
    };
    const urls = await UploadService.uploadPublic(file);
    return json(urls == null ? void 0 : urls[0]);
  } catch (error) {
    console.log(error);
    return json(`Could not upload file`, { status: 500 });
  }
};
var UploadServer;
((UploadServer2) => {
  UploadServer2.service = UploadService;
  UploadServer2.actionPrivate = uploadPrivateAction;
  UploadServer2.actionPublic = uploadPublicAction;
  UploadServer2.trpcRouter = UploadRouter;
})(UploadServer || (UploadServer = {}));
const action$2 = UploadServer.actionPrivate;
const route9 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  action: action$2
}, Symbol.toStringTag, { value: "Module" }));
const { Title: Title$3, Text: Text$3 } = Typography;
function SettingsPage() {
  const { user } = useUserContext();
  const [profileForm] = Form.useForm();
  const [passwordForm] = Form.useForm();
  const [payoutForm] = Form.useForm();
  const { data: userData, refetch } = Api.user.findFirst.useQuery({
    where: { id: user == null ? void 0 : user.id },
    include: { socialAccounts: true }
  });
  const {
    data: affiliateLink,
    isLoading: isLoadingAffiliateLink,
    error: affiliateLinkError
  } = Api.affiliateLink.findFirst.useQuery(void 0, {
    onError: () => {
      message.error("Failed to load affiliate link");
    }
  });
  const { mutateAsync: updateUser } = Api.user.update.useMutation();
  const { mutateAsync: updatePassword } = Api.authentication.updatePassword.useMutation();
  const { mutateAsync: createSocialAccount } = Api.socialAccount.create.useMutation();
  const { mutateAsync: deleteSocialAccount } = Api.socialAccount.delete.useMutation();
  const { mutateAsync: processWithdrawal } = Api.billing.processWithdrawal.useMutation();
  const { mutateAsync: logout } = Api.authentication.logout.useMutation({
    onSuccess: (data) => {
      if (data.redirect) {
        window.location.href = data.redirect;
      }
    }
  });
  const handleClickLogout = async () => {
    try {
      const response = await logout();
      if (response.redirect) {
        window.location.href = response.redirect;
      }
    } catch (error) {
      message.error("Failed to logout");
    }
  };
  const handleProfileUpdate = async (values) => {
    var _a2, _b2;
    try {
      if (user == null ? void 0 : user.id) {
        await updateUser({
          where: { id: user.id },
          data: {
            name: values.name
          }
        });
        message.success("Profile updated successfully");
        refetch();
      }
    } catch (error) {
      const errorMessage = ((_a2 = error.data) == null ? void 0 : _a2.code) === "UNAUTHORIZED" ? "Current password is incorrect!" : ((_b2 = error.data) == null ? void 0 : _b2.message) || "Failed to update password";
      message.error(errorMessage);
    }
  };
  const handlePasswordChange = async (values) => {
    var _a2;
    const { currentPassword, newPassword, confirmPassword } = values;
    if (newPassword !== confirmPassword) {
      message.error("New passwords do not match!");
      return;
    }
    try {
      await updatePassword({
        userId: user == null ? void 0 : user.id,
        currentPassword,
        newPassword
      });
      message.success("Password updated successfully");
      passwordForm.resetFields();
    } catch (error) {
      if (((_a2 = error.data) == null ? void 0 : _a2.code) === "UNAUTHORIZED") {
        message.error("Current password is incorrect!");
      } else {
        message.error("Failed to update password");
      }
    }
  };
  const handleConnectSocial = async (platform) => {
    try {
      if (platform === "YouTube") {
        window.location.href = "/api/auth/youtube";
        return;
      }
      if (user == null ? void 0 : user.id) {
        await createSocialAccount({
          data: {
            platform,
            status: "CONNECTED",
            userId: user.id
          }
        });
        message.success(`${platform} account connected`);
        refetch();
      }
    } catch (error) {
      message.error(`Failed to connect ${platform} account`);
    }
  };
  const handleDisconnectSocial = async (accountId) => {
    try {
      await deleteSocialAccount({
        where: { id: accountId }
      });
      message.success("Social account disconnected");
      refetch();
    } catch (error) {
      message.error("Failed to disconnect account");
    }
  };
  const handlePayoutSettingsSubmit = async (values) => {
    try {
      await processWithdrawal({
        amount: "0",
        phoneNumber: values.phoneNumber || ""
      });
      message.success("Payout settings saved successfully");
      payoutForm.resetFields(["phoneNumber"]);
    } catch (error) {
      message.error("Failed to save payout settings");
    }
  };
  return /* @__PURE__ */ jsx(PageLayout, { layout: "full-width", children: /* @__PURE__ */ jsxs("div", { style: { maxWidth: 1200, margin: "0 auto", padding: "24px" }, children: [
    /* @__PURE__ */ jsxs(Title$3, { level: 2, children: [
      /* @__PURE__ */ jsx("i", { className: "las la-cog" }),
      " Settings"
    ] }),
    /* @__PURE__ */ jsx(Text$3, { children: "Manage your account settings and preferences" }),
    /* @__PURE__ */ jsxs(Row, { gutter: [24, 24], style: { marginTop: 24 }, children: [
      /* @__PURE__ */ jsx(Col, { xs: 24, children: /* @__PURE__ */ jsxs(
        Card,
        {
          title: /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsx("i", { className: "las la-user" }),
            " Profile Information"
          ] }),
          children: [
            /* @__PURE__ */ jsxs("div", { style: { marginBottom: "16px" }, children: [
              /* @__PURE__ */ jsxs(Typography.Text, { children: [
                "Name:",
                " ",
                /* @__PURE__ */ jsx(Typography.Text, { strong: true, children: userData == null ? void 0 : userData.name })
              ] }),
              /* @__PURE__ */ jsx("br", {}),
              /* @__PURE__ */ jsxs(Typography.Text, { children: [
                "Email:",
                " ",
                /* @__PURE__ */ jsx(Typography.Text, { strong: true, children: userData == null ? void 0 : userData.email })
              ] })
            ] }),
            /* @__PURE__ */ jsxs(
              Form,
              {
                form: profileForm,
                layout: "vertical",
                initialValues: {
                  name: userData == null ? void 0 : userData.name,
                  email: userData == null ? void 0 : userData.email
                },
                onFinish: handleProfileUpdate,
                children: [
                  /* @__PURE__ */ jsx(Form.Item, { label: "Name", name: "name", children: /* @__PURE__ */ jsx(Input, { placeholder: "Enter your name" }) }),
                  /* @__PURE__ */ jsxs(Space, { children: [
                    /* @__PURE__ */ jsxs(Button, { type: "primary", htmlType: "submit", children: [
                      /* @__PURE__ */ jsx("i", { className: "las la-save" }),
                      " Save Changes"
                    ] }),
                    /* @__PURE__ */ jsxs(Button, { danger: true, onClick: handleClickLogout, children: [
                      /* @__PURE__ */ jsx("i", { className: "las la-sign-out-alt" }),
                      " Logout"
                    ] })
                  ] })
                ]
              }
            )
          ]
        }
      ) }),
      /* @__PURE__ */ jsx(Col, { xs: 24, children: /* @__PURE__ */ jsx(
        Card,
        {
          title: /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsx("i", { className: "las la-share-alt" }),
            " Connected Accounts"
          ] }),
          style: { marginTop: 24 },
          children: /* @__PURE__ */ jsx(
            "div",
            {
              style: { display: "flex", flexDirection: "column", gap: 16 },
              children: ["TikTok", "Facebook", "YouTube"].map((platform) => {
                var _a2, _b2;
                const isConnected = (_a2 = userData == null ? void 0 : userData.socialAccounts) == null ? void 0 : _a2.some(
                  (account2) => account2.platform === platform
                );
                const account = (_b2 = userData == null ? void 0 : userData.socialAccounts) == null ? void 0 : _b2.find(
                  (account2) => account2.platform === platform
                );
                return /* @__PURE__ */ jsxs(
                  "div",
                  {
                    style: {
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center"
                    },
                    children: [
                      /* @__PURE__ */ jsxs(Text$3, { style: { display: "flex", alignItems: "center" }, children: [
                        platform === "YouTube" ? /* @__PURE__ */ jsx(
                          YoutubeFilled,
                          {
                            style: {
                              fontSize: "16px",
                              color: "#FF0000",
                              marginRight: "5px"
                            }
                          }
                        ) : platform === "TikTok" ? /* @__PURE__ */ jsx(
                          TikTokOutlined,
                          {
                            style: {
                              fontSize: "16px",
                              color: "#000000",
                              marginRight: "5px"
                            }
                          }
                        ) : /* @__PURE__ */ jsx(
                          FacebookFilled,
                          {
                            style: {
                              fontSize: "16px",
                              color: "#1877F2",
                              marginRight: "5px"
                            }
                          }
                        ),
                        platform
                      ] }),
                      isConnected && account ? /* @__PURE__ */ jsx(
                        Button,
                        {
                          danger: true,
                          onClick: () => handleDisconnectSocial(account.id),
                          children: "Disconnect"
                        }
                      ) : /* @__PURE__ */ jsx(
                        Button,
                        {
                          type: "primary",
                          onClick: () => handleConnectSocial(platform),
                          children: "Connect"
                        }
                      )
                    ]
                  },
                  platform
                );
              })
            }
          )
        }
      ) }),
      /* @__PURE__ */ jsx(Col, { xs: 24, children: /* @__PURE__ */ jsxs(
        Card,
        {
          title: /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsx("i", { className: "las la-hand-holding-usd" }),
            " Affiliate Program"
          ] }),
          style: { marginTop: 24 },
          children: [
            /* @__PURE__ */ jsx(Text$3, { children: "Earn 50% commission on every referral!" }),
            /* @__PURE__ */ jsx("div", { style: { marginTop: 16 }, children: (affiliateLink == null ? void 0 : affiliateLink.url) ? /* @__PURE__ */ jsxs(Space, { children: [
              /* @__PURE__ */ jsx(
                Input,
                {
                  value: `${affiliateLink.url}?ref=${user == null ? void 0 : user.id}&tx=${Date.now()}`,
                  readOnly: true
                }
              ),
              /* @__PURE__ */ jsx(Tooltip, { title: "Copy affiliate link", children: /* @__PURE__ */ jsx(
                Button,
                {
                  icon: /* @__PURE__ */ jsx(CopyOutlined, {}),
                  onClick: () => {
                    navigator.clipboard.writeText(
                      `${affiliateLink.url}?ref=${user == null ? void 0 : user.id}&tx=${Date.now()}`
                    );
                    message.success("Affiliate link copied to clipboard!");
                  }
                }
              ) })
            ] }) : /* @__PURE__ */ jsx(
              Button,
              {
                type: "primary",
                onClick: () => {
                  if (isLoadingAffiliateLink) return;
                  message.error(
                    "Affiliate link not available. Please try again later."
                  );
                },
                loading: isLoadingAffiliateLink,
                children: "Become An Affiliate to earn"
              }
            ) })
          ]
        }
      ) }),
      /* @__PURE__ */ jsx(Col, { xs: 24, children: /* @__PURE__ */ jsx(
        Card,
        {
          title: /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsx("i", { className: "las la-money-check" }),
            " Payout Settings"
          ] }),
          style: { marginTop: 24 },
          children: /* @__PURE__ */ jsxs(Form, { form: payoutForm, layout: "vertical", onFinish: handlePayoutSettingsSubmit, children: [
            /* @__PURE__ */ jsx(
              Form.Item,
              {
                label: "Phone Number",
                name: "phoneNumber",
                rules: [
                  { required: true, message: "Phone number is required" },
                  {
                    pattern: /^(237|\+237)?[6-9][0-9]{8}$/,
                    message: "Please enter a valid Cameroon phone number"
                  }
                ],
                children: /* @__PURE__ */ jsx(Input, { addonBefore: "+237", placeholder: "Enter your phone number" })
              }
            ),
            /* @__PURE__ */ jsx(Form.Item, { children: /* @__PURE__ */ jsxs(Button, { type: "primary", htmlType: "submit", children: [
              /* @__PURE__ */ jsx("i", { className: "las la-save" }),
              " Save Payout Settings"
            ] }) })
          ] })
        }
      ) }),
      /* @__PURE__ */ jsx(Col, { xs: 24, children: /* @__PURE__ */ jsx(
        Card,
        {
          title: /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsx("i", { className: "las la-key" }),
            " Change Passwordd"
          ] }),
          style: { marginTop: 24 },
          children: /* @__PURE__ */ jsxs(
            Form,
            {
              form: passwordForm,
              layout: "vertical",
              onFinish: handlePasswordChange,
              children: [
                /* @__PURE__ */ jsx(
                  Form.Item,
                  {
                    label: "Current Password",
                    name: "currentPassword",
                    rules: [{ required: true, message: "Current password is required" }],
                    children: /* @__PURE__ */ jsx(Input.Password, { placeholder: "Enter your current password" })
                  }
                ),
                /* @__PURE__ */ jsx(
                  Form.Item,
                  {
                    label: "New Password",
                    name: "newPassword",
                    rules: [{ required: true, message: "New password is required" }],
                    children: /* @__PURE__ */ jsx(Input.Password, { placeholder: "Enter your new password" })
                  }
                ),
                /* @__PURE__ */ jsx(
                  Form.Item,
                  {
                    label: "Confirm New Password",
                    name: "confirmPassword",
                    rules: [{ required: true, message: "Please confirm your new password" }],
                    children: /* @__PURE__ */ jsx(Input.Password, { placeholder: "Confirm your new password" })
                  }
                ),
                /* @__PURE__ */ jsx(Form.Item, { children: /* @__PURE__ */ jsx(Space, { children: /* @__PURE__ */ jsxs(Button, { type: "primary", htmlType: "submit", children: [
                  /* @__PURE__ */ jsx("i", { className: "las la-save" }),
                  " Save New Password"
                ] }) }) })
              ]
            }
          )
        }
      ) })
    ] })
  ] }) });
}
const route10 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: SettingsPage
}, Symbol.toStringTag, { value: "Module" }));
const action$1 = UploadServer.actionPublic;
const route11 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  action: action$1
}, Symbol.toStringTag, { value: "Module" }));
const { Title: Title$2, Text: Text$2 } = Typography;
function CoursesPage() {
  const navigate = useNavigate();
  const { user, isLoggedIn, checkRole } = useUserContext();
  const { data: courses, isLoading } = Api.course.findMany.useQuery({});
  const { data: subscription } = Api.subscription.findFirst.useQuery({
    where: { userId: user == null ? void 0 : user.id }
  });
  const { data: premiumLink, isLoading: isLoadingPremiumLink } = Api.premiumLink.findFirst.useQuery(void 0, {
    retry: false
  });
  const isPremiumUser = checkRole(["ADMIN", "PREMIUM"]);
  const handleUpgrade = async () => {
    try {
      if (premiumLink == null ? void 0 : premiumLink.url) {
        window.location.href = premiumLink.url;
      } else {
        navigate("/upgrade");
      }
    } catch (error) {
      console.error("Error handling upgrade:", error);
      message.error("Failed to process upgrade request. Please try again.");
      navigate("/upgrade");
    }
  };
  const [isEnrolling, setIsEnrolling] = useState(false);
  const { mutateAsync: createEnrollment } = Api.userCourse.create.useMutation();
  const handleJoinCourse = async (course) => {
    if (!isLoggedIn) {
      message.warning("Please login to join courses");
      navigate("/login");
      return;
    }
    if (course.isPremium) {
      if (!checkRole(["ADMIN", "PREMIUM"])) {
        message.warning(
          "This is a premium course. Please upgrade your subscription to access."
        );
        navigate(`/courses/${course.id}/preview`);
        return;
      }
    }
    setIsEnrolling(true);
    try {
      await createEnrollment({
        data: {
          courseId: course.id,
          userId: user.id
        }
      });
      message.success("Successfully enrolled in course");
      navigate(`/courses/${course.id}`);
    } catch (error) {
      if (error.code === "NOT_FOUND") {
        message.error("Course not found");
      } else if (error.code === "CONFLICT") {
        message.error("You are already enrolled in this course");
      } else if (error.code === "FORBIDDEN") {
        message.error("Premium subscription required for course enrollment");
      } else {
        message.error("You are already enrolled in this course");
      }
    } finally {
      setIsEnrolling(false);
    }
  };
  if (isLoading) {
    return /* @__PURE__ */ jsx(PageLayout, { layout: "full-width", children: /* @__PURE__ */ jsx("div", { style: { textAlign: "center", padding: "50px" }, children: /* @__PURE__ */ jsx(Spin, { size: "large" }) }) });
  }
  return /* @__PURE__ */ jsx(PageLayout, { layout: "full-width", children: /* @__PURE__ */ jsxs("div", { style: { maxWidth: "1200px", margin: "0 auto", padding: "20px" }, children: [
    /* @__PURE__ */ jsxs("div", { style: { textAlign: "center", marginBottom: "40px" }, children: [
      /* @__PURE__ */ jsxs(Title$2, { level: 2, children: [
        /* @__PURE__ */ jsx("i", { className: "las la-play-circle" }),
        " Course Library"
      ] }),
      /* @__PURE__ */ jsx(Text$2, { children: "Explore our collection of premium courses. Upgrade your account to access all content." })
    ] }),
    !isPremiumUser && !checkRole("ADMIN") && /* @__PURE__ */ jsxs(
      Card,
      {
        style: {
          marginBottom: "24px",
          textAlign: "center",
          background: "#f0f7ff"
        },
        children: [
          /* @__PURE__ */ jsxs(Title$2, { level: 4, children: [
            /* @__PURE__ */ jsx("i", { className: "las la-crown" }),
            " Unlock All Premium Content"
          ] }),
          /* @__PURE__ */ jsx(Text$2, { children: "Get unlimited access to all our premium courses and exclusive content." }),
          /* @__PURE__ */ jsx("div", { style: { marginTop: "16px" }, children: /* @__PURE__ */ jsx(
            Button,
            {
              type: "primary",
              size: "large",
              onClick: handleUpgrade,
              loading: isLoadingPremiumLink,
              children: isLoadingPremiumLink ? "Loading..." : "Upgrade Now"
            }
          ) })
        ]
      }
    ),
    /* @__PURE__ */ jsx(Row, { gutter: [24, 24], children: courses == null ? void 0 : courses.map((course) => /* @__PURE__ */ jsx(Col, { xs: 24, sm: 12, md: 8, lg: 8, children: /* @__PURE__ */ jsx(
      Card,
      {
        hoverable: true,
        cover: /* @__PURE__ */ jsxs("div", { style: { position: "relative" }, children: [
          /* @__PURE__ */ jsx(
            ImageOptimizedClient.Img,
            {
              src: course.previewUrl,
              srcOnError: "/images/course-fallback.jpg",
              isPretty: true,
              styleWrapper: {
                position: "relative",
                maxWidth: "100%",
                height: "auto",
                aspectRatio: "16/9"
              },
              styleImg: {
                objectFit: "cover",
                objectPosition: "center",
                width: "100%",
                height: "100%"
              }
            }
          ),
          /* @__PURE__ */ jsx(
            "div",
            {
              style: {
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              },
              children: /* @__PURE__ */ jsx(
                "i",
                {
                  className: "las la-play-circle",
                  style: { fontSize: "48px", color: "#1890ff" }
                }
              )
            }
          )
        ] }),
        actions: [
          /* @__PURE__ */ jsx(
            Button,
            {
              type: "",
              block: true,
              onClick: () => handleJoinCourse(course),
              loading: isEnrolling,
              style: { backgroundColor: "#000000", color: "#ffffff" },
              children: "Join Course"
            },
            "watch"
          )
        ],
        children: /* @__PURE__ */ jsx(
          Card.Meta,
          {
            title: /* @__PURE__ */ jsxs(
              "div",
              {
                style: {
                  display: "flex",
                  alignItems: "center",
                  gap: "8px"
                },
                children: [
                  course.title,
                  course.isPremium && /* @__PURE__ */ jsx(
                    "i",
                    {
                      className: "las la-crown",
                      style: { color: "#ffd700", fontSize: "18px" }
                    }
                  )
                ]
              }
            ),
            description: /* @__PURE__ */ jsxs(Fragment, { children: [
              /* @__PURE__ */ jsx(Text$2, { children: course.description }),
              course.isPremium && !isPremiumUser && /* @__PURE__ */ jsx("div", { style: { marginTop: "8px" }, children: /* @__PURE__ */ jsxs(Text$2, { type: "secondary", children: [
                /* @__PURE__ */ jsx("i", { className: "las la-lock" }),
                " Premium content"
              ] }) })
            ] })
          }
        )
      }
    ) }, course.id)) })
  ] }) });
}
const route12 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: CoursesPage
}, Symbol.toStringTag, { value: "Module" }));
function PricingPage() {
  const { data: products, isLoading: isLoadingProducts } = Api.billing.findManyProducts.useQuery({}, { initialData: [] });
  const { mutateAsync: createPaymentLink } = Api.billing.createPaymentLink.useMutation();
  const { data: subscriptions } = Api.billing.findManySubscriptions.useQuery(
    {},
    { initialData: [] }
  );
  const handleClick = async (product) => {
    const { url } = await createPaymentLink({ productId: product.id });
    window.open(url, "_blank");
  };
  const getPrice = (product) => {
    if (product.price === 0) {
      return "Free";
    }
    return `XAF ${product.price}`;
  };
  const isSubscribed = (product) => {
    return subscriptions.find(
      (subscription) => subscription.productId === product.id
    );
  };
  return /* @__PURE__ */ jsx(PageLayout, { isCentered: true, children: /* @__PURE__ */ jsxs(Row, { gutter: [16, 16], justify: "center", className: "w-full", children: [
    products.length === 0 && isLoadingProducts && /* @__PURE__ */ jsx(Spin, {}),
    products.length === 0 && !isLoadingProducts && /* @__PURE__ */ jsx(
      Empty,
      {
        imageStyle: { height: 60 },
        description: "No products found on Stripe"
      }
    ),
    products.filter((product) => product.name !== "Enterprise").map((product) => /* @__PURE__ */ jsx(Col, { xs: 24, sm: 12, md: 12, lg: 12, xl: 8, children: /* @__PURE__ */ jsx(
      Card,
      {
        style: { height: "100%", overflow: "hidden" },
        hoverable: true,
        onClick: () => handleClick(product),
        cover: /* @__PURE__ */ jsx(
          Flex,
          {
            style: {
              position: "relative",
              height: "40vh",
              width: "100%",
              overflow: "hidden",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderTopLeftRadius: "10px",
              borderTopRightRadius: "10px"
            },
            children: /* @__PURE__ */ jsx(
              "img",
              {
                src: product.coverUrl,
                alt: product.name,
                style: {
                  position: "absolute",
                  top: 0,
                  left: 0,
                  height: "100%",
                  width: "100%",
                  objectFit: "cover"
                }
              }
            )
          }
        ),
        children: /* @__PURE__ */ jsxs(Flex, { vertical: true, gap: 10, children: [
          /* @__PURE__ */ jsx(Typography.Title, { level: 3, style: { margin: 0 }, children: product.name }),
          /* @__PURE__ */ jsxs(Flex, { align: "center", children: [
            /* @__PURE__ */ jsx(Typography.Title, { level: 1, style: { margin: 0 }, children: getPrice(product) }),
            product.interval && /* @__PURE__ */ jsxs(Typography.Text, { className: "ml-1", children: [
              "/ ",
              product.interval
            ] })
          ] }),
          isSubscribed(product) && /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(Tag, { color: "success", children: "Active" }) }),
          /* @__PURE__ */ jsx(Typography.Text, { type: "secondary", children: product.description })
        ] })
      }
    ) }, product.id))
  ] }) });
}
const route13 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: PricingPage
}, Symbol.toStringTag, { value: "Module" }));
function ProfilePage() {
  const { user, refetch: refetchUser } = useUserContext();
  const { mutateAsync: logout } = Api.authentication.logout.useMutation({
    onSuccess: (data) => {
      if (data.redirect) {
        window.location.href = data.redirect;
      }
    }
  });
  const [form] = Form.useForm();
  const [isLoading, setLoading] = useState(false);
  const [isLoadingLogout, setLoadingLogout] = useState(false);
  const [fileList, setFileList] = useState([]);
  const { mutateAsync: updateUser } = Api.user.update.useMutation();
  const { mutateAsync: upload } = useUploadPublic();
  useEffect(() => {
    form.setFieldsValue(user);
  }, [user]);
  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      let pictureUrl = values.pictureUrl;
      if (fileList.length > 0) {
        const { url } = await upload({ file: fileList[0] });
        pictureUrl = url;
      }
      await updateUser({
        where: { id: user.id },
        data: {
          email: values.email,
          name: values.name,
          pictureUrl
        }
      });
      refetchUser();
    } catch (error) {
      console.error(`Could not save user: ${error.message}`, {
        variant: "error"
      });
    }
    setLoading(false);
  };
  const handleClickLogout = async () => {
    setLoadingLogout(true);
    try {
      await logout();
    } catch (error) {
      console.error(`Could not logout: ${error.message}`, {
        variant: "error"
      });
      setLoadingLogout(false);
    }
  };
  return /* @__PURE__ */ jsxs(PageLayout, { layout: "super-narrow", children: [
    /* @__PURE__ */ jsxs(Flex, { justify: "space-between", align: "center", children: [
      /* @__PURE__ */ jsx(Typography.Title, { level: 1, children: "Profile" }),
      /* @__PURE__ */ jsx(Button, { onClick: handleClickLogout, loading: isLoadingLogout, children: "Logout" })
    ] }),
    /* @__PURE__ */ jsx(Flex, { justify: "center", style: { marginBottom: "30px" }, children: /* @__PURE__ */ jsx(Avatar, { size: 80, src: user == null ? void 0 : user.pictureUrl, children: Utility.stringToInitials(user == null ? void 0 : user.name) }) }),
    /* @__PURE__ */ jsxs(
      Form,
      {
        form,
        initialValues: user,
        onFinish: handleSubmit,
        layout: "vertical",
        requiredMark: false,
        children: [
          /* @__PURE__ */ jsx(
            Form.Item,
            {
              name: "name",
              label: "Name",
              rules: [{ required: true, message: "Name is required" }],
              children: /* @__PURE__ */ jsx(Input, {})
            }
          ),
          /* @__PURE__ */ jsx(
            Form.Item,
            {
              label: "Email",
              name: "email",
              rules: [{ required: true, message: "Email is required" }],
              children: /* @__PURE__ */ jsx(Input, { type: "email", placeholder: "Your email", autoComplete: "email" })
            }
          ),
          /* @__PURE__ */ jsx(Form.Item, { label: "Profile picture", name: "pictureUrl", children: /* @__PURE__ */ jsx(
            Upload,
            {
              fileList,
              beforeUpload: (file) => {
                setFileList([...fileList, file]);
                return false;
              },
              maxCount: 1,
              children: /* @__PURE__ */ jsx(Button, { icon: /* @__PURE__ */ jsx(UploadOutlined, {}), children: "Select Image" })
            }
          ) }),
          /* @__PURE__ */ jsx(Form.Item, { children: /* @__PURE__ */ jsx(Flex, { justify: "end", children: /* @__PURE__ */ jsx(Button, { type: "primary", htmlType: "submit", loading: isLoading, children: "Save" }) }) })
        ]
      }
    )
  ] });
}
const route14 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ProfilePage
}, Symbol.toStringTag, { value: "Module" }));
const { Title: Title$1, Text: Text$1, Paragraph } = Typography;
function UpgradePage() {
  useNavigate();
  const { user } = useUserContext();
  const { data: products, isLoading } = Api.billing.findManyProducts.useQuery({});
  const { data: premiumLink, isLoading: isPremiumLoading, error: premiumError, refetch } = Api.premiumLink.findFirst.useQuery(void 0, {
    onError: () => {
      message.error("Failed to load premium payment link");
    }
  });
  const { mutateAsync: createPaymentLink } = Api.billing.createPaymentLink.useMutation();
  const handleUpgrade = async (productId) => {
    try {
      const { url } = await createPaymentLink({
        productId
      });
      if (url) {
        window.location.href = url;
      }
    } catch (error) {
      message.error("Fapshi payment processing failed. Please try again.");
      console.error("Payment error:", error);
    }
  };
  const premiumFeatures = [
    {
      icon: "crown",
      title: "Premium Courses",
      description: "Access to all premium courses and content"
    },
    {
      icon: "download",
      title: "Offline Access",
      description: "Download courses for offline viewing"
    },
    {
      icon: "certificate",
      title: "Certificates",
      description: "Earn certificates upon course completion"
    }
  ];
  return /* @__PURE__ */ jsx(PageLayout, { layout: "full-width", children: /* @__PURE__ */ jsxs("div", { style: { maxWidth: 1200, margin: "0 auto", padding: "24px" }, children: [
    /* @__PURE__ */ jsxs(Title$1, { level: 2, style: { textAlign: "center" }, children: [
      /* @__PURE__ */ jsx("i", { className: "las la-gem", style: { marginRight: 8 } }),
      "Upgrade to Premium"
    ] }),
    /* @__PURE__ */ jsx(Paragraph, { style: { textAlign: "center", marginBottom: 40 }, children: "Unlock all premium features and take your learning experience to the next level" }),
    /* @__PURE__ */ jsx(Row, { gutter: [24, 24], style: { marginBottom: 48 }, children: premiumFeatures.map((feature, index) => /* @__PURE__ */ jsx(Col, { xs: 24, sm: 12, md: 6, children: /* @__PURE__ */ jsxs(Card, { style: { height: "100%", textAlign: "center" }, children: [
      /* @__PURE__ */ jsx(
        "i",
        {
          className: `las la-${feature.icon}`,
          style: { fontSize: 32, color: "#1890ff", marginBottom: 16 }
        }
      ),
      /* @__PURE__ */ jsx(Title$1, { level: 4, children: feature.title }),
      /* @__PURE__ */ jsx(Text$1, { type: "secondary", children: feature.description })
    ] }) }, index)) }),
    /* @__PURE__ */ jsx("div", { style: { textAlign: "center", marginBottom: 48 }, children: /* @__PURE__ */ jsx(
      Button,
      {
        type: "primary",
        size: "large",
        onClick: () => {
          if (isPremiumLoading) return;
          if (premiumLink == null ? void 0 : premiumLink.url) {
            window.location.href = premiumLink.url;
          } else {
            message.warning("Payment link not available. Please try again later.");
            refetch();
          }
        },
        loading: isPremiumLoading,
        icon: /* @__PURE__ */ jsx("i", { className: "las la-gem" }),
        style: {
          background: "#1890ff",
          borderColor: "#1890ff",
          padding: "0 40px"
        },
        children: isPremiumLoading ? "Loading..." : "PAY NOW"
      }
    ) }),
    /* @__PURE__ */ jsx(Row, { gutter: [24, 24], justify: "center", children: isLoading ? /* @__PURE__ */ jsx(Col, { span: 24, style: { textAlign: "center" }, children: /* @__PURE__ */ jsx(Text$1, { children: "Loading available plans..." }) }) : products == null ? void 0 : products.filter((product) => product.name !== "Enterprise").map((product, index) => /* @__PURE__ */ jsx(Col, { xs: 24, sm: 12, children: /* @__PURE__ */ jsxs(
      Card,
      {
        title: /* @__PURE__ */ jsx(Title$1, { level: 3, style: { textAlign: "center", margin: 0 }, children: product.name }),
        style: { height: "100%" },
        children: [
          /* @__PURE__ */ jsx("div", { style: { textAlign: "center", marginBottom: 24 }, children: /* @__PURE__ */ jsx(Title$1, { level: 2, style: { margin: 0 }, children: product.name === "Basic" ? "Free" : "XAF 3000/month" }) }),
          /* @__PURE__ */ jsx(Paragraph, { style: { minHeight: 80 }, children: product.description }),
          /* @__PURE__ */ jsxs(Flex, { vertical: true, gap: 8, children: [
            /* @__PURE__ */ jsx(
              Button,
              {
                type: "primary",
                size: "large",
                block: true,
                onClick: () => handleUpgrade(product.id),
                icon: /* @__PURE__ */ jsx(
                  "img",
                  {
                    src: "/fapshi-icon.png",
                    alt: "Fapshi",
                    style: { height: "16px", marginRight: "8px" }
                  }
                ),
                style: {
                  background: "#FF6B00",
                  borderColor: "#FF6B00",
                  boxShadow: "0 2px 0 rgba(255, 107, 0, 0.1)",
                  fontWeight: 600
                },
                className: "hover:opacity-90 transition-opacity",
                children: "Pay with Fapshi"
              }
            ),
            /* @__PURE__ */ jsx(
              Button,
              {
                type: "primary",
                size: "large",
                block: true,
                onClick: () => {
                  if (isPremiumLoading) return;
                  if (premiumLink == null ? void 0 : premiumLink.url) {
                    window.location.href = premiumLink.url;
                  } else {
                    message.warning("Payment link not available. Please try again later.");
                    refetch();
                  }
                },
                loading: isPremiumLoading,
                icon: /* @__PURE__ */ jsx("i", { className: "las la-gem" }),
                style: {
                  background: "#1890ff",
                  borderColor: "#1890ff"
                },
                children: isPremiumLoading ? "Loading..." : "Pay Now"
              }
            ),
            /* @__PURE__ */ jsx(
              Button,
              {
                type: "default",
                size: "large",
                block: true,
                onClick: () => window.open("/pricing", "_blank"),
                icon: /* @__PURE__ */ jsx("i", { className: "las la-info-circle" }),
                children: "Learn More"
              }
            )
          ] })
        ]
      }
    ) }, index)) }),
    /* @__PURE__ */ jsx("div", { style: { textAlign: "center", marginTop: 48 }, children: /* @__PURE__ */ jsxs(Text$1, { type: "secondary", children: [
      /* @__PURE__ */ jsx("i", { className: "las la-lock", style: { marginRight: 8 } }),
      "Secure payment powered by Fapshi - Premium Features Await!"
    ] }) })
  ] }) });
}
const route15 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: UpgradePage
}, Symbol.toStringTag, { value: "Module" }));
function RegisterPage() {
  const router = useNavigate();
  const [searchParams] = useSearchParams();
  const [form] = Form.useForm();
  const [isLoading, setLoading] = useState(false);
  const { mutateAsync: register } = Api.authentication.register.useMutation();
  useEffect(() => {
    var _a2;
    const email = (_a2 = searchParams.get("email")) == null ? void 0 : _a2.trim();
    if (Utility.isDefined(email)) {
      form.setFieldsValue({ email });
    }
  }, [searchParams]);
  const handleSubmit = async (values) => {
    var _a2;
    setLoading(true);
    try {
      const tokenInvitation = searchParams.get("tokenInvitation") ?? void 0;
      const randomPassword = generateRandomPassword();
      const response = await register({
        ...values,
        password: randomPassword,
        // Ensure password is included
        tokenInvitation
      });
      message.success("Registration successful! Please check your email for verification.");
      router("/login");
    } catch (error) {
      console.error("Could not sign up:", error);
      if (((_a2 = error == null ? void 0 : error.data) == null ? void 0 : _a2.code) === "CONFLICT") {
        message.error("This user already exists. Please sign in or use a different email.");
      } else {
        message.error("An error occurred during registration. Please try again.");
      }
      setLoading(false);
    }
  };
  const generateRandomPassword = () => {
    return Math.random().toString(36).slice(-8);
  };
  return /* @__PURE__ */ jsx(Flex, { align: "center", justify: "center", vertical: true, flex: 1, children: /* @__PURE__ */ jsxs(Flex, { vertical: true, style: { width: "340px", paddingBottom: "50px", paddingTop: "50px" }, gap: "middle", children: [
    /* @__PURE__ */ jsx(AppHeader, { description: "Welcome!" }),
    /* @__PURE__ */ jsxs(
      Form,
      {
        form,
        onFinish: handleSubmit,
        layout: "vertical",
        autoComplete: "off",
        requiredMark: false,
        children: [
          /* @__PURE__ */ jsx(Form.Item, { label: "Email", name: "email", rules: [{ required: true, message: "Email is required" }], children: /* @__PURE__ */ jsx(Input, { type: "email", placeholder: "Your email", autoComplete: "email" }) }),
          /* @__PURE__ */ jsx(Form.Item, { name: "name", rules: [{ required: true, message: "Name is required" }], label: "Name", children: /* @__PURE__ */ jsx(Input, { placeholder: "Your name" }) }),
          /* @__PURE__ */ jsx(Form.Item, { children: /* @__PURE__ */ jsx(Button, { type: "primary", htmlType: "submit", loading: isLoading, block: true, children: "Register" }) })
        ]
      }
    ),
    /* @__PURE__ */ jsx(Button, { ghost: true, style: { border: "none" }, onClick: () => router("/login"), children: /* @__PURE__ */ jsxs(Flex, { gap: "small", justify: "center", children: [
      /* @__PURE__ */ jsx(Typography.Text, { type: "secondary", children: "Have an account?" }),
      " ",
      /* @__PURE__ */ jsx(Typography.Text, { children: "Sign in" })
    ] }) })
  ] }) });
}
const route16 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: RegisterPage
}, Symbol.toStringTag, { value: "Module" }));
const { Title, Text } = Typography;
function WalletPage() {
  const { user } = useUserContext();
  const [withdrawForm] = Form.useForm();
  const [isWithdrawModalVisible, setIsWithdrawModalVisible] = useState(false);
  const [isDepositModalVisible, setIsDepositModalVisible] = useState(false);
  const [isDepositing, setIsDepositing] = useState(false);
  const [depositForm] = Form.useForm();
  const { data: wallet, refetch: refetchWallet } = Api.wallet.findFirst.useQuery({
    where: { userId: user == null ? void 0 : user.id }
  });
  const { data: transactions } = Api.transaction.findMany.useQuery({
    where: { userId: user == null ? void 0 : user.id },
    orderBy: { createdAt: "desc" }
  });
  const { mutateAsync: initiateDeposit } = Api.billing.initiateDeposit.useMutation();
  const { mutateAsync: processWithdrawal } = Api.billing.processWithdrawal.useMutation();
  const handleDeposit = async (values) => {
    setIsDepositing(true);
    try {
      await initiateDeposit({
        amount: values.amount,
        phoneNumber: values.phoneNumber
      });
      setIsDepositModalVisible(false);
      depositForm.resetFields();
      refetchWallet();
      message.success("Dépôt Mobile Money initié avec succès");
    } catch (error) {
      message.error(error.message);
    } finally {
      setIsDepositing(false);
    }
  };
  const handleWithdraw = async (values) => {
    try {
      await processWithdrawal({
        amount: values.amount,
        phoneNumber: values.phoneNumber
      });
      message.success("Mobile Money withdrawal processed successfully");
      withdrawForm.resetFields();
      setIsWithdrawModalVisible(false);
      refetchWallet();
    } catch (error) {
      message.error(error.message || "Failed to process withdrawal");
    }
  };
  const columns = [
    {
      title: "Type",
      dataIndex: "type",
      key: "type"
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      render: (amount) => `XAF ${amount}`
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status"
    },
    {
      title: "Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date) => new Date(date).toLocaleDateString()
    }
  ];
  return /* @__PURE__ */ jsxs(PageLayout, { children: [
    /* @__PURE__ */ jsxs(Row, { gutter: [24, 24], children: [
      /* @__PURE__ */ jsx(Col, { xs: 24, children: /* @__PURE__ */ jsxs(Card, { children: [
        /* @__PURE__ */ jsx(Title, { level: 3, children: "Wallet Balance" }),
        /* @__PURE__ */ jsxs(Text, { strong: true, style: { fontSize: 24 }, children: [
          "XAF ",
          (wallet == null ? void 0 : wallet.balance) || "0.00"
        ] }),
        /* @__PURE__ */ jsxs("div", { style: { marginTop: 24 }, children: [
          /* @__PURE__ */ jsx(
            Button,
            {
              type: "primary",
              onClick: () => setIsDepositModalVisible(true),
              style: { marginRight: 16 },
              children: "Deposit Funds"
            }
          ),
          /* @__PURE__ */ jsx(Button, { onClick: () => setIsWithdrawModalVisible(true), children: "Withdraw Funds" })
        ] })
      ] }) }),
      /* @__PURE__ */ jsx(Col, { xs: 24, children: /* @__PURE__ */ jsxs(Card, { children: [
        /* @__PURE__ */ jsx(Title, { level: 3, children: "Transaction History" }),
        /* @__PURE__ */ jsx(
          Table,
          {
            columns,
            dataSource: transactions,
            rowKey: "id",
            pagination: { pageSize: 10 }
          }
        )
      ] }) })
    ] }),
    /* @__PURE__ */ jsx(
      Modal,
      {
        title: "Mobile Money Deposit",
        open: isDepositModalVisible,
        onOk: () => depositForm.submit(),
        onCancel: () => setIsDepositModalVisible(false),
        okButtonProps: { loading: isDepositing },
        children: /* @__PURE__ */ jsxs(Form, { form: depositForm, onFinish: handleDeposit, children: [
          /* @__PURE__ */ jsx(
            Form.Item,
            {
              name: "amount",
              label: "Amount",
              rules: [
                { required: true, message: "Please enter deposit amount" },
                { pattern: /^\d+$/, message: "Please enter a valid amount" },
                { validator: (_, value) => {
                  if (value && parseInt(value) <= 0) {
                    return Promise.reject("Amount must be greater than 0");
                  }
                  return Promise.resolve();
                } }
              ],
              children: /* @__PURE__ */ jsx(Input, { prefix: "XAF" })
            }
          ),
          /* @__PURE__ */ jsx(
            Form.Item,
            {
              name: "phoneNumber",
              label: "Phone Number",
              rules: [
                { required: true, message: "Please enter phone number" },
                {
                  pattern: /^(237|\\+237)?[6-9][0-9]{8}$/,
                  message: "Please enter a valid Cameroon phone number"
                }
              ],
              children: /* @__PURE__ */ jsx(Input, { addonBefore: "+237" })
            }
          )
        ] })
      }
    ),
    /* @__PURE__ */ jsx(
      Modal,
      {
        title: "Withdraw Funds",
        open: isWithdrawModalVisible,
        onOk: () => withdrawForm.submit(),
        onCancel: () => setIsWithdrawModalVisible(false),
        children: /* @__PURE__ */ jsxs(Form, { form: withdrawForm, onFinish: handleWithdraw, children: [
          /* @__PURE__ */ jsx(
            Form.Item,
            {
              name: "amount",
              label: "Amount",
              rules: [
                { required: true, message: "Please enter withdrawal amount" },
                { pattern: /^\d+$/, message: "Please enter a valid amount" }
              ],
              children: /* @__PURE__ */ jsx(Input, { prefix: "NGN" })
            }
          ),
          /* @__PURE__ */ jsx(
            Form.Item,
            {
              name: "phoneNumber",
              label: "Phone Number",
              rules: [
                { required: true, message: "Please enter phone number" },
                {
                  pattern: /^(237|\\+237)?[6-9][0-9]{8}$/,
                  message: "Please enter a valid Cameroon phone number"
                }
              ],
              children: /* @__PURE__ */ jsx(Input, { addonBefore: "+237" })
            }
          )
        ] })
      }
    )
  ] });
}
const route17 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: WalletPage
}, Symbol.toStringTag, { value: "Module" }));
function LoginPage() {
  const router = useNavigate();
  const [searchParams] = useSearchParams();
  const [form] = Form.useForm();
  const [isLoading, setLoading] = useState(false);
  const { mutateAsync: createAdmin } = Api.authentication.createAdmin.useMutation();
  const { mutateAsync: login } = Api.authentication.login.useMutation({
    onSuccess: (data) => {
      if (data.redirect) {
        window.location.href = data.redirect;
      }
    }
  });
  const errorKey = searchParams.get("error");
  const errorMessage = {
    Signin: "Try signing in with a different account.",
    OAuthSignin: "Try signing in with a different account.",
    OAuthCallback: "Try signing in with a different account.",
    OAuthCreateAccount: "Try signing in with a different account.",
    EmailCreateAccount: "Try signing in with a different account.",
    Callback: "Try signing in with a different account.",
    OAuthAccountNotLinked: "To confirm your identity, sign in with the same account you used originally.",
    UserNotVerified: "Please verify your account by checking your email.",
    EmailSignin: "Check your email address.",
    CredentialsSignin: "Sign in failed. Check the details you provided are correct.",
    default: "Unable to sign in."
  }[errorKey ?? "default"];
  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      form.setFieldValue("email", "user@test.com");
      form.setFieldValue("password", "password123");
    }
  }, []);
  useEffect(() => {
    const createAdminUser = async () => {
      try {
        await createAdmin({
          email: "admin@admin.com",
          password: "admin123"
        });
      } catch (error) {
      }
    };
    createAdminUser();
  }, [createAdmin]);
  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const response = await login({
        email: values.email,
        password: values.password
      });
      if (!response.success) {
        setLoading(false);
        window.location.href = response.redirect;
      }
    } catch (error) {
      if (error instanceof Error) {
        if ("code" in error) {
          window.location.href = `/login?error=${error.code}`;
        } else {
          window.location.href = "/login?error=default";
        }
      }
      setLoading(false);
    }
  };
  return /* @__PURE__ */ jsx(Flex, { align: "center", justify: "center", vertical: true, flex: 1, children: /* @__PURE__ */ jsxs(
    Flex,
    {
      vertical: true,
      style: {
        width: "340px",
        paddingBottom: "50px",
        paddingTop: "50px"
      },
      gap: "middle",
      children: [
        /* @__PURE__ */ jsx(AppHeader, { description: "Welcome!" }),
        errorKey && /* @__PURE__ */ jsx(Typography.Text, { type: "danger", children: errorMessage }),
        /* @__PURE__ */ jsxs(
          Form,
          {
            form,
            onFinish: handleSubmit,
            layout: "vertical",
            requiredMark: false,
            children: [
              /* @__PURE__ */ jsx(
                Form.Item,
                {
                  label: "Email",
                  name: "email",
                  rules: [{ required: true, message: "Email is required" }],
                  children: /* @__PURE__ */ jsx(Input, { type: "email", placeholder: "Your email", autoComplete: "email" })
                }
              ),
              /* @__PURE__ */ jsx(
                Form.Item,
                {
                  label: "Password",
                  name: "password",
                  rules: [{ required: true, message: "Password is required" }],
                  children: /* @__PURE__ */ jsx(
                    Input.Password,
                    {
                      type: "password",
                      placeholder: "Your password",
                      autoComplete: "current-password"
                    }
                  )
                }
              ),
              /* @__PURE__ */ jsx(Form.Item, { children: /* @__PURE__ */ jsx(Flex, { justify: "end", children: /* @__PURE__ */ jsx(
                Button,
                {
                  type: "link",
                  onClick: () => window.open("https://wa.link/f2dnnq", "_blank"),
                  style: { padding: 0, margin: 0 },
                  children: "Forgot password?"
                }
              ) }) }),
              /* @__PURE__ */ jsx(Form.Item, { children: /* @__PURE__ */ jsx(Button, { type: "primary", htmlType: "submit", block: true, loading: isLoading, children: "Sign in" }) })
            ]
          }
        ),
        /* @__PURE__ */ jsx(
          Button,
          {
            ghost: true,
            style: { border: "none" },
            onClick: () => router("/register"),
            children: /* @__PURE__ */ jsxs(Flex, { gap: "small", justify: "center", children: [
              /* @__PURE__ */ jsx(Typography.Text, { type: "secondary", children: "No account?" }),
              " ",
              /* @__PURE__ */ jsx(Typography.Text, { children: "Sign up" })
            ] })
          }
        ),
        /* @__PURE__ */ jsx(
          Button,
          {
            ghost: true,
            style: { border: "none" },
            onClick: () => window.location.href = "https://skillflow.online/login/",
            children: /* @__PURE__ */ jsxs(Flex, { gap: "small", justify: "center", children: [
              /* @__PURE__ */ jsx(Typography.Text, { type: "secondary", children: "Issue signing in?" }),
              /* @__PURE__ */ jsx(Typography.Text, { children: "Click here then try again!" })
            ] })
          }
        )
      ]
    }
  ) });
}
const route18 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: LoginPage
}, Symbol.toStringTag, { value: "Module" }));
async function checkMutate(promise) {
  var _a2;
  try {
    return await promise;
  } catch (err) {
    if (isPrismaClientKnownRequestError(err)) {
      if (err.code === "P2004") {
        if (((_a2 = err.meta) == null ? void 0 : _a2.reason) === "RESULT_NOT_READABLE") {
          return void 0;
        } else {
          throw new TRPCError({
            code: "FORBIDDEN",
            message: err.message,
            cause: err
          });
        }
      } else {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: err.message,
          cause: err
        });
      }
    } else {
      throw err;
    }
  }
}
async function checkRead(promise) {
  try {
    return await promise;
  } catch (err) {
    if (isPrismaClientKnownRequestError(err)) {
      if (err.code === "P2004") {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: err.message,
          cause: err
        });
      } else if (err.code === "P2025") {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: err.message,
          cause: err
        });
      } else {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: err.message,
          cause: err
        });
      }
    } else {
      throw err;
    }
  }
}
const $Schema$d = _Schema.default ?? _Schema;
function createRouter$e(router, procedure2) {
  return router(
    {
      createMany: procedure2.input($Schema$d.UserInputSchema.createMany.optional()).mutation(async ({ ctx, input }) => checkMutate(db(ctx).user.createMany(input))),
      create: procedure2.input($Schema$d.UserInputSchema.create).mutation(async ({ ctx, input }) => checkMutate(db(ctx).user.create(input))),
      deleteMany: procedure2.input($Schema$d.UserInputSchema.deleteMany.optional()).mutation(async ({ ctx, input }) => checkMutate(db(ctx).user.deleteMany(input))),
      delete: procedure2.input($Schema$d.UserInputSchema.delete).mutation(async ({ ctx, input }) => checkMutate(db(ctx).user.delete(input))),
      findFirst: procedure2.input($Schema$d.UserInputSchema.findFirst.optional()).query(({ ctx, input }) => checkRead(db(ctx).user.findFirst(input))),
      findMany: procedure2.input($Schema$d.UserInputSchema.findMany.optional()).query(({ ctx, input }) => checkRead(db(ctx).user.findMany(input))),
      findUnique: procedure2.input($Schema$d.UserInputSchema.findUnique).query(({ ctx, input }) => checkRead(db(ctx).user.findUnique(input))),
      updateMany: procedure2.input($Schema$d.UserInputSchema.updateMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).user.updateMany(input))),
      update: procedure2.input($Schema$d.UserInputSchema.update).mutation(async ({ ctx, input }) => checkMutate(db(ctx).user.update(input))),
      count: procedure2.input($Schema$d.UserInputSchema.count.optional()).query(({ ctx, input }) => checkRead(db(ctx).user.count(input)))
    }
  );
}
const $Schema$c = _Schema.default ?? _Schema;
function createRouter$d(router, procedure2) {
  return router(
    {
      createMany: procedure2.input($Schema$c.SubscriptionInputSchema.createMany.optional()).mutation(async ({ ctx, input }) => checkMutate(db(ctx).subscription.createMany(input))),
      create: procedure2.input($Schema$c.SubscriptionInputSchema.create).mutation(async ({ ctx, input }) => checkMutate(db(ctx).subscription.create(input))),
      deleteMany: procedure2.input($Schema$c.SubscriptionInputSchema.deleteMany.optional()).mutation(async ({ ctx, input }) => checkMutate(db(ctx).subscription.deleteMany(input))),
      delete: procedure2.input($Schema$c.SubscriptionInputSchema.delete).mutation(async ({ ctx, input }) => checkMutate(db(ctx).subscription.delete(input))),
      findFirst: procedure2.input($Schema$c.SubscriptionInputSchema.findFirst.optional()).query(({ ctx, input }) => checkRead(db(ctx).subscription.findFirst(input))),
      findMany: procedure2.input($Schema$c.SubscriptionInputSchema.findMany.optional()).query(({ ctx, input }) => checkRead(db(ctx).subscription.findMany(input))),
      findUnique: procedure2.input($Schema$c.SubscriptionInputSchema.findUnique).query(({ ctx, input }) => checkRead(db(ctx).subscription.findUnique(input))),
      updateMany: procedure2.input($Schema$c.SubscriptionInputSchema.updateMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).subscription.updateMany(input))),
      update: procedure2.input($Schema$c.SubscriptionInputSchema.update).mutation(async ({ ctx, input }) => checkMutate(db(ctx).subscription.update(input))),
      count: procedure2.input($Schema$c.SubscriptionInputSchema.count.optional()).query(({ ctx, input }) => checkRead(db(ctx).subscription.count(input)))
    }
  );
}
const $Schema$b = _Schema.default ?? _Schema;
function createRouter$c(router, procedure2) {
  return router(
    {
      createMany: procedure2.input($Schema$b.CourseInputSchema.createMany.optional()).mutation(async ({ ctx, input }) => checkMutate(db(ctx).course.createMany(input))),
      create: procedure2.input($Schema$b.CourseInputSchema.create).mutation(async ({ ctx, input }) => checkMutate(db(ctx).course.create(input))),
      deleteMany: procedure2.input($Schema$b.CourseInputSchema.deleteMany.optional()).mutation(async ({ ctx, input }) => checkMutate(db(ctx).course.deleteMany(input))),
      delete: procedure2.input($Schema$b.CourseInputSchema.delete).mutation(async ({ ctx, input }) => checkMutate(db(ctx).course.delete(input))),
      findFirst: procedure2.input($Schema$b.CourseInputSchema.findFirst.optional()).query(({ ctx, input }) => checkRead(db(ctx).course.findFirst(input))),
      findMany: procedure2.input($Schema$b.CourseInputSchema.findMany.optional()).query(({ ctx, input }) => checkRead(db(ctx).course.findMany(input))),
      findUnique: procedure2.input($Schema$b.CourseInputSchema.findUnique).query(({ ctx, input }) => checkRead(db(ctx).course.findUnique(input))),
      updateMany: procedure2.input($Schema$b.CourseInputSchema.updateMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).course.updateMany(input))),
      update: procedure2.input($Schema$b.CourseInputSchema.update).mutation(async ({ ctx, input }) => checkMutate(db(ctx).course.update(input))),
      count: procedure2.input($Schema$b.CourseInputSchema.count.optional()).query(({ ctx, input }) => checkRead(db(ctx).course.count(input)))
    }
  );
}
const $Schema$a = _Schema.default ?? _Schema;
function createRouter$b(router, procedure2) {
  return router(
    {
      createMany: procedure2.input($Schema$a.SectionInputSchema.createMany.optional()).mutation(async ({ ctx, input }) => checkMutate(db(ctx).section.createMany(input))),
      create: procedure2.input($Schema$a.SectionInputSchema.create).mutation(async ({ ctx, input }) => checkMutate(db(ctx).section.create(input))),
      deleteMany: procedure2.input($Schema$a.SectionInputSchema.deleteMany.optional()).mutation(async ({ ctx, input }) => checkMutate(db(ctx).section.deleteMany(input))),
      delete: procedure2.input($Schema$a.SectionInputSchema.delete).mutation(async ({ ctx, input }) => checkMutate(db(ctx).section.delete(input))),
      findFirst: procedure2.input($Schema$a.SectionInputSchema.findFirst.optional()).query(({ ctx, input }) => checkRead(db(ctx).section.findFirst(input))),
      findMany: procedure2.input($Schema$a.SectionInputSchema.findMany.optional()).query(({ ctx, input }) => checkRead(db(ctx).section.findMany(input))),
      findUnique: procedure2.input($Schema$a.SectionInputSchema.findUnique).query(({ ctx, input }) => checkRead(db(ctx).section.findUnique(input))),
      updateMany: procedure2.input($Schema$a.SectionInputSchema.updateMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).section.updateMany(input))),
      update: procedure2.input($Schema$a.SectionInputSchema.update).mutation(async ({ ctx, input }) => checkMutate(db(ctx).section.update(input))),
      count: procedure2.input($Schema$a.SectionInputSchema.count.optional()).query(({ ctx, input }) => checkRead(db(ctx).section.count(input)))
    }
  );
}
const $Schema$9 = _Schema.default ?? _Schema;
function createRouter$a(router, procedure2) {
  return router(
    {
      createMany: procedure2.input($Schema$9.VideoInputSchema.createMany.optional()).mutation(async ({ ctx, input }) => checkMutate(db(ctx).video.createMany(input))),
      create: procedure2.input($Schema$9.VideoInputSchema.create).mutation(async ({ ctx, input }) => checkMutate(db(ctx).video.create(input))),
      deleteMany: procedure2.input($Schema$9.VideoInputSchema.deleteMany.optional()).mutation(async ({ ctx, input }) => checkMutate(db(ctx).video.deleteMany(input))),
      delete: procedure2.input($Schema$9.VideoInputSchema.delete).mutation(async ({ ctx, input }) => checkMutate(db(ctx).video.delete(input))),
      findFirst: procedure2.input($Schema$9.VideoInputSchema.findFirst.optional()).query(({ ctx, input }) => checkRead(db(ctx).video.findFirst(input))),
      findMany: procedure2.input($Schema$9.VideoInputSchema.findMany.optional()).query(({ ctx, input }) => checkRead(db(ctx).video.findMany(input))),
      findUnique: procedure2.input($Schema$9.VideoInputSchema.findUnique).query(({ ctx, input }) => checkRead(db(ctx).video.findUnique(input))),
      updateMany: procedure2.input($Schema$9.VideoInputSchema.updateMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).video.updateMany(input))),
      update: procedure2.input($Schema$9.VideoInputSchema.update).mutation(async ({ ctx, input }) => checkMutate(db(ctx).video.update(input))),
      count: procedure2.input($Schema$9.VideoInputSchema.count.optional()).query(({ ctx, input }) => checkRead(db(ctx).video.count(input)))
    }
  );
}
const $Schema$8 = _Schema.default ?? _Schema;
function createRouter$9(router, procedure2) {
  return router(
    {
      createMany: procedure2.input($Schema$8.WalletInputSchema.createMany.optional()).mutation(async ({ ctx, input }) => checkMutate(db(ctx).wallet.createMany(input))),
      create: procedure2.input($Schema$8.WalletInputSchema.create).mutation(async ({ ctx, input }) => checkMutate(db(ctx).wallet.create(input))),
      deleteMany: procedure2.input($Schema$8.WalletInputSchema.deleteMany.optional()).mutation(async ({ ctx, input }) => checkMutate(db(ctx).wallet.deleteMany(input))),
      delete: procedure2.input($Schema$8.WalletInputSchema.delete).mutation(async ({ ctx, input }) => checkMutate(db(ctx).wallet.delete(input))),
      findFirst: procedure2.input($Schema$8.WalletInputSchema.findFirst.optional()).query(({ ctx, input }) => checkRead(db(ctx).wallet.findFirst(input))),
      findMany: procedure2.input($Schema$8.WalletInputSchema.findMany.optional()).query(({ ctx, input }) => checkRead(db(ctx).wallet.findMany(input))),
      findUnique: procedure2.input($Schema$8.WalletInputSchema.findUnique).query(({ ctx, input }) => checkRead(db(ctx).wallet.findUnique(input))),
      updateMany: procedure2.input($Schema$8.WalletInputSchema.updateMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).wallet.updateMany(input))),
      update: procedure2.input($Schema$8.WalletInputSchema.update).mutation(async ({ ctx, input }) => checkMutate(db(ctx).wallet.update(input))),
      count: procedure2.input($Schema$8.WalletInputSchema.count.optional()).query(({ ctx, input }) => checkRead(db(ctx).wallet.count(input)))
    }
  );
}
const $Schema$7 = _Schema.default ?? _Schema;
function createRouter$8(router, procedure2) {
  return router(
    {
      createMany: procedure2.input($Schema$7.ReferralInputSchema.createMany.optional()).mutation(async ({ ctx, input }) => checkMutate(db(ctx).referral.createMany(input))),
      create: procedure2.input($Schema$7.ReferralInputSchema.create).mutation(async ({ ctx, input }) => checkMutate(db(ctx).referral.create(input))),
      deleteMany: procedure2.input($Schema$7.ReferralInputSchema.deleteMany.optional()).mutation(async ({ ctx, input }) => checkMutate(db(ctx).referral.deleteMany(input))),
      delete: procedure2.input($Schema$7.ReferralInputSchema.delete).mutation(async ({ ctx, input }) => checkMutate(db(ctx).referral.delete(input))),
      findFirst: procedure2.input($Schema$7.ReferralInputSchema.findFirst.optional()).query(({ ctx, input }) => checkRead(db(ctx).referral.findFirst(input))),
      findMany: procedure2.input($Schema$7.ReferralInputSchema.findMany.optional()).query(({ ctx, input }) => checkRead(db(ctx).referral.findMany(input))),
      findUnique: procedure2.input($Schema$7.ReferralInputSchema.findUnique).query(({ ctx, input }) => checkRead(db(ctx).referral.findUnique(input))),
      updateMany: procedure2.input($Schema$7.ReferralInputSchema.updateMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).referral.updateMany(input))),
      update: procedure2.input($Schema$7.ReferralInputSchema.update).mutation(async ({ ctx, input }) => checkMutate(db(ctx).referral.update(input))),
      count: procedure2.input($Schema$7.ReferralInputSchema.count.optional()).query(({ ctx, input }) => checkRead(db(ctx).referral.count(input)))
    }
  );
}
const $Schema$6 = _Schema.default ?? _Schema;
function createRouter$7(router, procedure2) {
  return router(
    {
      createMany: procedure2.input($Schema$6.TransactionInputSchema.createMany.optional()).mutation(async ({ ctx, input }) => checkMutate(db(ctx).transaction.createMany(input))),
      create: procedure2.input($Schema$6.TransactionInputSchema.create).mutation(async ({ ctx, input }) => checkMutate(db(ctx).transaction.create(input))),
      deleteMany: procedure2.input($Schema$6.TransactionInputSchema.deleteMany.optional()).mutation(async ({ ctx, input }) => checkMutate(db(ctx).transaction.deleteMany(input))),
      delete: procedure2.input($Schema$6.TransactionInputSchema.delete).mutation(async ({ ctx, input }) => checkMutate(db(ctx).transaction.delete(input))),
      findFirst: procedure2.input($Schema$6.TransactionInputSchema.findFirst.optional()).query(({ ctx, input }) => checkRead(db(ctx).transaction.findFirst(input))),
      findMany: procedure2.input($Schema$6.TransactionInputSchema.findMany.optional()).query(({ ctx, input }) => checkRead(db(ctx).transaction.findMany(input))),
      findUnique: procedure2.input($Schema$6.TransactionInputSchema.findUnique).query(({ ctx, input }) => checkRead(db(ctx).transaction.findUnique(input))),
      updateMany: procedure2.input($Schema$6.TransactionInputSchema.updateMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).transaction.updateMany(input))),
      update: procedure2.input($Schema$6.TransactionInputSchema.update).mutation(async ({ ctx, input }) => checkMutate(db(ctx).transaction.update(input))),
      count: procedure2.input($Schema$6.TransactionInputSchema.count.optional()).query(({ ctx, input }) => checkRead(db(ctx).transaction.count(input)))
    }
  );
}
const $Schema$5 = _Schema.default ?? _Schema;
function createRouter$6(router, procedure2) {
  return router(
    {
      createMany: procedure2.input($Schema$5.SocialAccountInputSchema.createMany.optional()).mutation(async ({ ctx, input }) => checkMutate(db(ctx).socialAccount.createMany(input))),
      create: procedure2.input($Schema$5.SocialAccountInputSchema.create).mutation(async ({ ctx, input }) => checkMutate(db(ctx).socialAccount.create(input))),
      deleteMany: procedure2.input($Schema$5.SocialAccountInputSchema.deleteMany.optional()).mutation(async ({ ctx, input }) => checkMutate(db(ctx).socialAccount.deleteMany(input))),
      delete: procedure2.input($Schema$5.SocialAccountInputSchema.delete).mutation(async ({ ctx, input }) => checkMutate(db(ctx).socialAccount.delete(input))),
      findFirst: procedure2.input($Schema$5.SocialAccountInputSchema.findFirst.optional()).query(({ ctx, input }) => checkRead(db(ctx).socialAccount.findFirst(input))),
      findMany: procedure2.input($Schema$5.SocialAccountInputSchema.findMany.optional()).query(({ ctx, input }) => checkRead(db(ctx).socialAccount.findMany(input))),
      findUnique: procedure2.input($Schema$5.SocialAccountInputSchema.findUnique).query(({ ctx, input }) => checkRead(db(ctx).socialAccount.findUnique(input))),
      updateMany: procedure2.input($Schema$5.SocialAccountInputSchema.updateMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).socialAccount.updateMany(input))),
      update: procedure2.input($Schema$5.SocialAccountInputSchema.update).mutation(async ({ ctx, input }) => checkMutate(db(ctx).socialAccount.update(input))),
      count: procedure2.input($Schema$5.SocialAccountInputSchema.count.optional()).query(({ ctx, input }) => checkRead(db(ctx).socialAccount.count(input)))
    }
  );
}
const $Schema$4 = _Schema.default ?? _Schema;
function createRouter$5(router, procedure2) {
  return router(
    {
      createMany: procedure2.input($Schema$4.SkillFeedVideoInputSchema.createMany.optional()).mutation(async ({ ctx, input }) => checkMutate(db(ctx).skillFeedVideo.createMany(input))),
      create: procedure2.input($Schema$4.SkillFeedVideoInputSchema.create).mutation(async ({ ctx, input }) => checkMutate(db(ctx).skillFeedVideo.create(input))),
      deleteMany: procedure2.input($Schema$4.SkillFeedVideoInputSchema.deleteMany.optional()).mutation(async ({ ctx, input }) => checkMutate(db(ctx).skillFeedVideo.deleteMany(input))),
      delete: procedure2.input($Schema$4.SkillFeedVideoInputSchema.delete).mutation(async ({ ctx, input }) => checkMutate(db(ctx).skillFeedVideo.delete(input))),
      findFirst: procedure2.input($Schema$4.SkillFeedVideoInputSchema.findFirst.optional()).query(({ ctx, input }) => checkRead(db(ctx).skillFeedVideo.findFirst(input))),
      findMany: procedure2.input($Schema$4.SkillFeedVideoInputSchema.findMany.optional()).query(({ ctx, input }) => checkRead(db(ctx).skillFeedVideo.findMany(input))),
      findUnique: procedure2.input($Schema$4.SkillFeedVideoInputSchema.findUnique).query(({ ctx, input }) => checkRead(db(ctx).skillFeedVideo.findUnique(input))),
      updateMany: procedure2.input($Schema$4.SkillFeedVideoInputSchema.updateMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).skillFeedVideo.updateMany(input))),
      update: procedure2.input($Schema$4.SkillFeedVideoInputSchema.update).mutation(async ({ ctx, input }) => checkMutate(db(ctx).skillFeedVideo.update(input))),
      count: procedure2.input($Schema$4.SkillFeedVideoInputSchema.count.optional()).query(({ ctx, input }) => checkRead(db(ctx).skillFeedVideo.count(input)))
    }
  );
}
const $Schema$3 = _Schema.default ?? _Schema;
function createRouter$4(router, procedure2) {
  return router(
    {
      createMany: procedure2.input($Schema$3.UserCourseInputSchema.createMany.optional()).mutation(async ({ ctx, input }) => checkMutate(db(ctx).userCourse.createMany(input))),
      create: procedure2.input($Schema$3.UserCourseInputSchema.create).mutation(async ({ ctx, input }) => checkMutate(db(ctx).userCourse.create(input))),
      deleteMany: procedure2.input($Schema$3.UserCourseInputSchema.deleteMany.optional()).mutation(async ({ ctx, input }) => checkMutate(db(ctx).userCourse.deleteMany(input))),
      delete: procedure2.input($Schema$3.UserCourseInputSchema.delete).mutation(async ({ ctx, input }) => checkMutate(db(ctx).userCourse.delete(input))),
      findFirst: procedure2.input($Schema$3.UserCourseInputSchema.findFirst.optional()).query(({ ctx, input }) => checkRead(db(ctx).userCourse.findFirst(input))),
      findMany: procedure2.input($Schema$3.UserCourseInputSchema.findMany.optional()).query(({ ctx, input }) => checkRead(db(ctx).userCourse.findMany(input))),
      findUnique: procedure2.input($Schema$3.UserCourseInputSchema.findUnique).query(({ ctx, input }) => checkRead(db(ctx).userCourse.findUnique(input))),
      updateMany: procedure2.input($Schema$3.UserCourseInputSchema.updateMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).userCourse.updateMany(input))),
      update: procedure2.input($Schema$3.UserCourseInputSchema.update).mutation(async ({ ctx, input }) => checkMutate(db(ctx).userCourse.update(input))),
      count: procedure2.input($Schema$3.UserCourseInputSchema.count.optional()).query(({ ctx, input }) => checkRead(db(ctx).userCourse.count(input)))
    }
  );
}
const $Schema$2 = _Schema.default ?? _Schema;
function createRouter$3(router, procedure2) {
  return router(
    {
      createMany: procedure2.input($Schema$2.PremiumLinkInputSchema.createMany.optional()).mutation(async ({ ctx, input }) => checkMutate(db(ctx).premiumLink.createMany(input))),
      create: procedure2.input($Schema$2.PremiumLinkInputSchema.create).mutation(async ({ ctx, input }) => checkMutate(db(ctx).premiumLink.create(input))),
      deleteMany: procedure2.input($Schema$2.PremiumLinkInputSchema.deleteMany.optional()).mutation(async ({ ctx, input }) => checkMutate(db(ctx).premiumLink.deleteMany(input))),
      delete: procedure2.input($Schema$2.PremiumLinkInputSchema.delete).mutation(async ({ ctx, input }) => checkMutate(db(ctx).premiumLink.delete(input))),
      findFirst: procedure2.input($Schema$2.PremiumLinkInputSchema.findFirst.optional()).query(({ ctx, input }) => checkRead(db(ctx).premiumLink.findFirst(input))),
      findMany: procedure2.input($Schema$2.PremiumLinkInputSchema.findMany.optional()).query(({ ctx, input }) => checkRead(db(ctx).premiumLink.findMany(input))),
      findUnique: procedure2.input($Schema$2.PremiumLinkInputSchema.findUnique).query(({ ctx, input }) => checkRead(db(ctx).premiumLink.findUnique(input))),
      updateMany: procedure2.input($Schema$2.PremiumLinkInputSchema.updateMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).premiumLink.updateMany(input))),
      update: procedure2.input($Schema$2.PremiumLinkInputSchema.update).mutation(async ({ ctx, input }) => checkMutate(db(ctx).premiumLink.update(input))),
      count: procedure2.input($Schema$2.PremiumLinkInputSchema.count.optional()).query(({ ctx, input }) => checkRead(db(ctx).premiumLink.count(input)))
    }
  );
}
const $Schema$1 = _Schema.default ?? _Schema;
function createRouter$2(router, procedure2) {
  return router(
    {
      createMany: procedure2.input($Schema$1.AffiliateLinkInputSchema.createMany.optional()).mutation(async ({ ctx, input }) => checkMutate(db(ctx).affiliateLink.createMany(input))),
      create: procedure2.input($Schema$1.AffiliateLinkInputSchema.create).mutation(async ({ ctx, input }) => checkMutate(db(ctx).affiliateLink.create(input))),
      deleteMany: procedure2.input($Schema$1.AffiliateLinkInputSchema.deleteMany.optional()).mutation(async ({ ctx, input }) => checkMutate(db(ctx).affiliateLink.deleteMany(input))),
      delete: procedure2.input($Schema$1.AffiliateLinkInputSchema.delete).mutation(async ({ ctx, input }) => checkMutate(db(ctx).affiliateLink.delete(input))),
      findFirst: procedure2.input($Schema$1.AffiliateLinkInputSchema.findFirst.optional()).query(({ ctx, input }) => checkRead(db(ctx).affiliateLink.findFirst(input))),
      findMany: procedure2.input($Schema$1.AffiliateLinkInputSchema.findMany.optional()).query(({ ctx, input }) => checkRead(db(ctx).affiliateLink.findMany(input))),
      findUnique: procedure2.input($Schema$1.AffiliateLinkInputSchema.findUnique).query(({ ctx, input }) => checkRead(db(ctx).affiliateLink.findUnique(input))),
      updateMany: procedure2.input($Schema$1.AffiliateLinkInputSchema.updateMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).affiliateLink.updateMany(input))),
      update: procedure2.input($Schema$1.AffiliateLinkInputSchema.update).mutation(async ({ ctx, input }) => checkMutate(db(ctx).affiliateLink.update(input))),
      count: procedure2.input($Schema$1.AffiliateLinkInputSchema.count.optional()).query(({ ctx, input }) => checkRead(db(ctx).affiliateLink.count(input)))
    }
  );
}
const $Schema = _Schema.default ?? _Schema;
function createRouter$1(router, procedure2) {
  return router(
    {
      createMany: procedure2.input($Schema.PayoutSettingsInputSchema.createMany.optional()).mutation(async ({ ctx, input }) => checkMutate(db(ctx).payoutSettings.createMany(input))),
      create: procedure2.input($Schema.PayoutSettingsInputSchema.create).mutation(async ({ ctx, input }) => checkMutate(db(ctx).payoutSettings.create(input))),
      deleteMany: procedure2.input($Schema.PayoutSettingsInputSchema.deleteMany.optional()).mutation(async ({ ctx, input }) => checkMutate(db(ctx).payoutSettings.deleteMany(input))),
      delete: procedure2.input($Schema.PayoutSettingsInputSchema.delete).mutation(async ({ ctx, input }) => checkMutate(db(ctx).payoutSettings.delete(input))),
      findFirst: procedure2.input($Schema.PayoutSettingsInputSchema.findFirst.optional()).query(({ ctx, input }) => checkRead(db(ctx).payoutSettings.findFirst(input))),
      findMany: procedure2.input($Schema.PayoutSettingsInputSchema.findMany.optional()).query(({ ctx, input }) => checkRead(db(ctx).payoutSettings.findMany(input))),
      findUnique: procedure2.input($Schema.PayoutSettingsInputSchema.findUnique).query(({ ctx, input }) => checkRead(db(ctx).payoutSettings.findUnique(input))),
      updateMany: procedure2.input($Schema.PayoutSettingsInputSchema.updateMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).payoutSettings.updateMany(input))),
      update: procedure2.input($Schema.PayoutSettingsInputSchema.update).mutation(async ({ ctx, input }) => checkMutate(db(ctx).payoutSettings.update(input))),
      count: procedure2.input($Schema.PayoutSettingsInputSchema.count.optional()).query(({ ctx, input }) => checkRead(db(ctx).payoutSettings.count(input)))
    }
  );
}
function db(ctx) {
  if (!ctx.prisma) {
    throw new Error('Missing "prisma" field in trpc context');
  }
  return ctx.prisma;
}
function createRouter(router, procedure2) {
  return router(
    {
      user: createRouter$e(router, procedure2),
      subscription: createRouter$d(router, procedure2),
      course: createRouter$c(router, procedure2),
      section: createRouter$b(router, procedure2),
      video: createRouter$a(router, procedure2),
      wallet: createRouter$9(router, procedure2),
      referral: createRouter$8(router, procedure2),
      transaction: createRouter$7(router, procedure2),
      socialAccount: createRouter$6(router, procedure2),
      skillFeedVideo: createRouter$5(router, procedure2),
      userCourse: createRouter$4(router, procedure2),
      premiumLink: createRouter$3(router, procedure2),
      affiliateLink: createRouter$2(router, procedure2),
      payoutSettings: createRouter$1(router, procedure2)
    }
  );
}
const validateFlutterwaveKeys = () => {
  const requiredKeys = ["FLW_PUBLIC_KEY", "FLW_SECRET_KEY", "FLW_ENCRYPTION_KEY"];
  const missingKeys = requiredKeys.filter((key) => !process.env[key]);
  if (missingKeys.length > 0) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: `Missing required Flutterwave environment variables: ${missingKeys.join(", ")}`
    });
  }
};
const trpcRouter = Trpc.createRouter({
  getPublic: Trpc.procedurePublic.query(async () => {
    const variables = process.env ?? {};
    validateFlutterwaveKeys();
    const authenticationProviders = AuthenticationServer.getProviders().map(
      (provider) => ({ name: provider.name })
    );
    const variablesPublic = {
      authenticationProviders,
      FLW_PUBLIC_KEY: process.env.FLW_PUBLIC_KEY,
      FLW_SECRET_KEY: process.env.FLW_SECRET_KEY,
      FLW_ENCRYPTION_KEY: process.env.FLW_ENCRYPTION_KEY
    };
    for (const [key, value] of Object.entries(variables)) {
      const isPublic = key.startsWith("PUBLIC_");
      if (isPublic) {
        variablesPublic[key] = value;
      }
    }
    return variablesPublic;
  })
});
const ConfigurationServer = {
  trpcRouter
};
class GeminiProvider {
  constructor() {
    __publicField(this, "generativeAI");
    this.initialize();
  }
  fromTextToAudio(text) {
    throw new Error("Method not implemented for this provider.");
  }
  generateImage(prompt) {
    throw new Error("Method not implemented for this provider.");
  }
  initialize() {
    try {
      const apiKey = process.env.SERVER_GEMINI_API_KEY;
      if (!apiKey) {
        console.log(`Set SERVER_GEMINI_API_KEY in your .env to activate Gemini`);
        return;
      }
      this.generativeAI = new GoogleGenerativeAI(apiKey);
      console.log(`Gemini is active`);
    } catch (error) {
      console.error(`Gemini failed to start`, error);
    }
  }
  isActive() {
    return !!this.generativeAI;
  }
  async generateText(options) {
    if (!this.isActive()) {
      return;
    }
    const model = this.generativeAI.getGenerativeModel({
      model: "gemini-1.5-flash"
      /* GEMINI_1_5_FLASH */
    });
    const { prompt, history, context, system } = options;
    const messageOptions = { content: prompt, history, context };
    const messages = this.buildMessages(messageOptions);
    const response = await model.generateContent({
      contents: messages,
      generationConfig: {
        temperature: 0.3
        /* DETERMINISTIC */
      }
    });
    return this.parseResponse(response);
  }
  async generateJson(instruction, content, schema) {
    const geminiSchema = toGeminiSchema(schema);
    const model = this.generativeAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: geminiSchema
      }
    });
    const response = await model.generateContent(content);
    return this.parseResponseJson(response);
  }
  async fromAudioToText(readStream) {
    if (!this.isActive()) {
      return;
    }
    const model = this.generativeAI.getGenerativeModel({
      model: "gemini-1.5-flash"
      /* GEMINI_1_5_FLASH */
    });
    const base64BufferString = await this.readStreamToBase64(readStream);
    const response = await model.generateContent([
      {
        inlineData: {
          mimeType: "audio/mp3",
          data: base64BufferString
        }
      },
      { text: "Provide a transcription of the audio." }
    ]);
    return this.parseResponse(response);
  }
  buildMessages(options) {
    const { content, context, history = [] } = options;
    const systemMessage = {
      role: "assistant",
      parts: [{ text: (context == null ? void 0 : context.trim()) || "" }]
    };
    const historyMessages = history.map((message2, index) => ({
      role: index % 2 === 0 ? "user" : "assistant",
      parts: [{ text: message2 }]
    }));
    const mainMessage = {
      role: "user",
      parts: [{ text: content }]
    };
    const filterEmptyText = (message2) => message2.parts.some((part) => part.text !== "");
    return [systemMessage, ...historyMessages, mainMessage].filter(
      filterEmptyText
    );
  }
  parseResponse(response) {
    const text = response.response.text();
    return text;
  }
  parseResponseJson(response) {
    const text = response.response.text();
    if (!text) {
      return;
    }
    return JSON.parse(text);
  }
  async readStreamToBase64(readStream) {
    return new Promise((resolve, reject) => {
      const chunks = [];
      readStream.on("data", (chunk) => {
        chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
      });
      readStream.on("end", () => {
        const buffer = Buffer.concat(chunks);
        resolve(buffer.toString("base64"));
      });
      readStream.on("error", (err) => {
        reject(err);
      });
    });
  }
}
class OpenaiProvider {
  constructor() {
    __publicField(this, "api");
    this.initialize();
  }
  initialize() {
    try {
      const apiKey = process.env.SERVER_OPENAI_API_KEY;
      if (!apiKey) {
        console.log(`Set SERVER_OPENAI_API_KEY in your .env to activate OpenAI`);
        return;
      }
      this.api = new OpenaiSDK({ apiKey });
      console.log(`Openai is active`);
    } catch (error) {
      console.error(`Openai failed to start`);
    }
  }
  isActive() {
    if (this.api) {
      return true;
    } else {
      return false;
    }
  }
  async generateText(options) {
    const { prompt, attachmentUrls, history, context } = options;
    const messageOptions = { content: prompt, attachmentUrls, history, context };
    const messages = this.buildMessages(messageOptions);
    const response = await this.api.chat.completions.create({
      model: "gpt-4o-mini",
      messages
    });
    const content = this.parseResponseContent(response);
    return content;
  }
  async generateJson(instruction, content, schema, attachmentUrls) {
    const messages = this.buildMessages({ content, attachmentUrls });
    const response = await this.api.beta.chat.completions.parse({
      model: "gpt-4o-mini",
      messages: [{ role: "system", content: instruction }, ...messages],
      response_format: zodResponseFormat(schema, "result")
    });
    const json2 = this.parseResponseJson(response);
    return json2;
  }
  async generateImage(prompt) {
    const response = await this.api.images.generate({
      model: "dall-e-3",
      prompt
    });
    const imageUrl = this.parseResponseImage(response);
    return imageUrl;
  }
  async fromAudioToText(readStream) {
    const transcription = await this.api.audio.transcriptions.create({
      file: readStream,
      model: "whisper-1"
      /* AUDIO_TO_TEXT */
    });
    return transcription.text;
  }
  async fromTextToAudio(text) {
    const mp3 = await this.api.audio.speech.create({
      model: "tts-1",
      voice: "alloy",
      input: text
    });
    const buffer = Buffer.from(await mp3.arrayBuffer());
    return buffer;
  }
  buildMessages(options) {
    const { content, context, attachmentUrls = [], history = [] } = options;
    const promptSystem = {
      role: "system",
      content: `${context}`.trim()
    };
    const historyMessages = history.map((message2, index) => ({
      role: index % 2 === 0 ? "user" : "assistant",
      content: [{ type: "text", text: message2 }]
    }));
    const mainMessage = {
      role: "user",
      content: [
        { type: "text", text: content },
        ...attachmentUrls.map((url) => ({
          type: "image_url",
          image_url: { url }
        }))
      ]
    };
    return [
      promptSystem,
      ...historyMessages,
      mainMessage
    ];
  }
  parseResponseContent(response) {
    return response.choices[0].message.content;
  }
  parseResponseImage(response) {
    return response.data[0].url;
  }
  parseResponseJson(response) {
    return response.choices[0].message.parsed;
  }
}
class AiServiceFactory {
  static create(providerType) {
    let provider;
    switch (providerType) {
      case "openai":
        provider = new OpenaiProvider();
        break;
      case "gemini":
        provider = new GeminiProvider();
        break;
      default:
        throw new Error("Unsupported AI provider");
    }
    if (!provider.isActive()) {
      let message2 = "";
      switch (providerType) {
        case "openai":
          message2 = "Set SERVER_OPENAI_API_KEY in your .env to activate OpenAI";
          break;
        case "gemini":
          message2 = "Set SERVER_GEMINI_API_KEY in your .env to activate Gemini";
          break;
      }
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: message2
      });
    }
    return provider;
  }
}
const AiRouter = Trpc.createRouter({
  generateText: Trpc.procedure.input(
    z.object({
      prompt: z.string(),
      attachmentUrls: z.array(z.string()).optional(),
      provider: z.enum(["openai", "gemini"]).default("openai")
    })
  ).mutation(async ({ input }) => {
    const { prompt, attachmentUrls, provider } = input;
    const aiService = AiServiceFactory.create(provider);
    const answer = await aiService.generateText({
      prompt,
      attachmentUrls
    });
    return { answer };
  }),
  /**
   * ? The schema in this function is an example. You should update it to your use-case.
   * ? If you need multiple schemas, you can create one dedicated function for each.
   */
  generateJson: Trpc.procedure.input(
    z.object({
      instruction: z.string(),
      content: z.string(),
      attachmentUrls: z.array(z.string()).optional(),
      provider: z.enum(["openai", "gemini"]).default("openai")
    })
  ).mutation(async ({ input }) => {
    const schema = z.object({
      results: z.array(
        z.object({
          description: z.string()
        })
      )
    });
    const aiService = AiServiceFactory.create(input.provider);
    const json2 = await aiService.generateJson(
      input.instruction,
      input.content,
      schema,
      input.attachmentUrls
    );
    return json2;
  }),
  generateImage: Trpc.procedure.input(
    z.object({
      prompt: z.string(),
      provider: z.enum(["openai", "gemini"]).default("openai")
    })
  ).mutation(async ({ input }) => {
    const aiService = AiServiceFactory.create(input.provider);
    const url = await aiService.generateImage(input.prompt);
    return { url };
  }),
  audioToText: Trpc.procedure.input(
    z.object({
      url: z.string(),
      provider: z.enum(["openai", "gemini"]).default("openai")
    })
  ).mutation(async ({ input }) => {
    const aiService = AiServiceFactory.create(input.provider);
    const arrayBuffer = await axios.get(input.url, { responseType: "arraybuffer" }).then((response) => response.data);
    const readstream = await FileHelper.createReadStreamFromArrayBuffer(
      arrayBuffer,
      "audio.wav"
    );
    const translation = await aiService.fromAudioToText(readstream);
    return { translation };
  }),
  textToAudio: Trpc.procedure.input(
    z.object({
      text: z.string(),
      provider: z.enum(["openai", "gemini"]).default("openai")
    })
  ).mutation(async ({ input }) => {
    const aiService = AiServiceFactory.create(input.provider);
    const buffer = await aiService.fromTextToAudio(input.text);
    const now = DateHelper.getNow();
    const name = `${now.getTime()}__text-to-audio.mp3`;
    const file = {
      name,
      mimetype: "audio/mp3",
      buffer
    };
    const urls = await UploadServer.service.uploadPublic(file);
    const url = urls[0].url;
    return { url };
  })
});
let Service$1 = class Service4 {
  constructor() {
    __publicField(this, "openai", new OpenaiProvider());
  }
  async generateText(options) {
    return this.openai.generateText(options);
  }
  async generateJson(instruction, content, schema, attachmentUrls) {
    return this.openai.generateJson(
      instruction,
      content,
      schema,
      attachmentUrls
    );
  }
  async generateImage(prompt) {
    return this.openai.generateImage(prompt);
  }
  async fromAudioToText(readStream) {
    return this.openai.fromAudioToText(readStream);
  }
  async fromTextToAudio(text) {
    return this.openai.fromTextToAudio(text);
  }
  isActive() {
    return this.openai.isActive();
  }
};
const AiService = new Service$1();
var AiServer;
((AiServer2) => {
  AiServer2.service = AiService;
  AiServer2.trpcRouter = AiRouter;
})(AiServer || (AiServer = {}));
const COMMISSION_PERCENTAGE = 0.5;
class FlutterwaveProvider {
  constructor() {
    __publicField(this, "flw");
    const publicKey = process.env.FLW_PUBLIC_KEY;
    const secretKey = process.env.FLW_SECRET_KEY;
    const encryptionKey = process.env.FLW_ENCRYPTION_KEY;
    if (!publicKey || !secretKey || !encryptionKey) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Missing required Flutterwave configuration keys"
      });
    }
    if (!publicKey.startsWith("FLWPUBK-")) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Invalid Flutterwave public key format"
      });
    }
    if (!secretKey.startsWith("FLWSECK-")) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Invalid Flutterwave secret key format"
      });
    }
    this.flw = new Flutterwave(publicKey, secretKey);
  }
  isActive() {
    return true;
  }
  async createCustomer(customer) {
    return customer.email;
  }
  async createPaymentLink(options) {
    const payload = {
      tx_ref: `tx-${Date.now()}`,
      amount: "100",
      // Get from product
      currency: "XAF",
      redirect_url: options.urlRedirection || "https://example.com",
      customer: {
        email: options.customerId
      },
      meta: options.metadata,
      customizations: {
        title: "Paiement Mobile Money",
        description: "Paiement par Mobile Money"
      },
      payment_type: "mobilemoneyfr",
      country: "CM",
      phone_number: options.phoneNumber
    };
    const response = await this.flw.MobileMoney.charge(payload);
    if (!response.status || response.status !== "success") {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Le paiement Mobile Money a échoué. Veuillez réessayer."
      });
    }
    return response.data.link;
  }
  async findManySubscriptions(customerId) {
    return [];
  }
  async findManyPayments(customerId) {
    const transactions = await this.flw.Transaction.fetch({
      customer_email: customerId
    });
    return transactions.data.map((tx) => ({
      id: tx.id.toString(),
      amount: tx.amount.toString(),
      currency: tx.currency,
      status: tx.status,
      created: new Date(tx.created_at).toISOString()
    }));
  }
  async findManyProducts() {
    return [];
  }
  async onPayment(body, sig) {
    var _a2;
    const secretHash = process.env.FLUTTERWAVE_SECRET_HASH;
    const payload = JSON.parse(body.toString());
    const isValid = this.flw.Webhook.verifyWebhook(sig, secretHash);
    if (!isValid) {
      throw new Error("Invalid webhook signature");
    }
    return {
      userId: (_a2 = payload.data.meta) == null ? void 0 : _a2.userId,
      customerId: payload.data.customer.email,
      transactionRef: payload.data.tx_ref,
      amount: payload.data.amount
    };
  }
  async getReferralCommission(amount) {
    const commission = parseFloat(amount) * COMMISSION_PERCENTAGE;
    return commission.toString();
  }
  async getWalletBalance(customerId) {
    return { balance: "0" };
  }
  async depositToWallet(options) {
    var _a2, _b2, _c, _d;
    const payload = {
      tx_ref: `withdrawal-${Date.now()}`,
      amount: options.amount,
      currency: "XAF",
      customer: { email: options.customerId },
      payment_type: "mobilemoneyfr",
      country: "CM",
      phone_number: options.phoneNumber
    };
    try {
      const response = await this.flw.MobileMoney.charge(payload);
      if (!response.status || response.status !== "success") {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Le dépôt Mobile Money a échoué. Veuillez réessayer."
        });
      }
      return true;
    } catch (error) {
      console.error("Flutterwave API Error:", {
        status: (_a2 = error.response) == null ? void 0 : _a2.status,
        data: (_b2 = error.response) == null ? void 0 : _b2.data,
        message: error.message
      });
      const errorCode = (_d = (_c = error.response) == null ? void 0 : _c.data) == null ? void 0 : _d.code;
      const errorMessage = {
        "INSUFFICIENT_FUNDS": "Solde insuffisant pour effectuer le dépôt",
        "INVALID_PHONE": "Numéro de téléphone invalide",
        "NETWORK_ERROR": "Erreur réseau, veuillez réessayer"
      }[errorCode] || "Le dépôt Mobile Money a échoué. Veuillez réessayer.";
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: errorMessage
      });
    }
  }
  async withdrawFromWallet(options) {
    const payload = {
      tx_ref: `withdrawal-${Date.now()}`,
      amount: options.amount,
      currency: "XAF",
      customer: { email: options.customerId },
      payment_type: "mobilemoneyfr",
      country: "CM",
      phone_number: options.phoneNumber
    };
    const response = await this.flw.MobileMoney.charge(payload);
    if (!response.status || response.status !== "success") {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Le retrait Mobile Money a échoué. Veuillez réessayer."
      });
    }
    return true;
  }
}
class Service5 {
  constructor() {
    __publicField(this, "provider", new FlutterwaveProvider());
  }
  isActive() {
    var _a2;
    if (this.provider) {
      return (_a2 = this.provider) == null ? void 0 : _a2.isActive();
    }
    return false;
  }
  getCustomerId(user) {
    return user.email;
  }
  async getWalletBalance(user) {
    const wallet = await this.provider.getWalletBalance(
      this.getCustomerId(user)
    );
    return wallet.balance;
  }
  async depositToWallet(user, amount, phoneNumber) {
    return this.provider.depositToWallet({
      customerId: this.getCustomerId(user),
      amount,
      phoneNumber
    });
  }
  async withdrawFromWallet(options) {
    await this.provider.withdrawFromWallet(options);
  }
  async findManyProducts() {
    return this.provider.findManyProducts();
  }
  async findManySubscriptions(customer) {
    return this.provider.findManySubscriptions(this.getCustomerId(customer));
  }
  async findManyPayments(user) {
    return this.provider.findManyPayments(this.getCustomerId(user));
  }
  async createPaymentLink(options) {
    const optionsPayment = {
      ...options,
      customerId: this.getCustomerId(options.user)
    };
    return this.provider.createPaymentLink(optionsPayment);
  }
}
class Singleton {
}
__publicField(Singleton, "service", new Service5());
const PaymentService = Singleton.service;
const BillingRouter = Trpc.createRouter({
  getWalletBalance: Trpc.procedure.input(z.object({})).query(async ({ ctx }) => {
    var _a2, _b2;
    if (!PaymentService.isActive()) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Payment provider not configured"
      });
    }
    const userId = (_b2 = (_a2 = ctx.session) == null ? void 0 : _a2.user) == null ? void 0 : _b2.id;
    const user = await ctx.database.user.findFirstOrThrow({
      where: { id: userId }
    });
    return PaymentService.getWalletBalance(user);
  }),
  initiateDeposit: Trpc.procedure.input(z.object({
    amount: z.string(),
    phoneNumber: z.string().regex(/^(237|\+237)?[6-9][0-9]{8}$/, "Invalid Cameroon phone number")
  })).mutation(async ({ ctx, input }) => {
    var _a2, _b2;
    if (!PaymentService.isActive()) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Payment provider not configured"
      });
    }
    const userId = (_b2 = (_a2 = ctx.session) == null ? void 0 : _a2.user) == null ? void 0 : _b2.id;
    const user = await ctx.database.user.findFirstOrThrow({
      where: { id: userId }
    });
    return PaymentService.depositToWallet(user, input.amount, input.phoneNumber);
  }),
  processWithdrawal: Trpc.procedure.input(
    z.object({
      amount: z.string(),
      phoneNumber: z.string().regex(/^(237|\\+237)?[6-9][0-9]{8}$/, "Veuillez entrer un numéro de téléphone Camerounais valide")
    }).required()
  ).mutation(async ({ ctx, input }) => {
    var _a2, _b2;
    if (!PaymentService.isActive()) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Payment provider not configured"
      });
    }
    try {
      const userId = (_b2 = (_a2 = ctx.session) == null ? void 0 : _a2.user) == null ? void 0 : _b2.id;
      const user = await ctx.database.user.findFirstOrThrow({
        where: { id: userId }
      });
      return PaymentService.withdrawFromWallet({
        customerId: user.id,
        amount: input.amount,
        phoneNumber: input.phoneNumber
      });
    } catch (error) {
      throw new TRPCError({
        code: error.code || "INTERNAL_SERVER_ERROR",
        message: error.message || "Le retrait Mobile Money a échoué. Veuillez réessayer."
      });
    }
  }),
  getReferralCommissions: Trpc.procedure.input(z.object({})).query(async ({ ctx }) => {
    var _a2, _b2;
    if (!PaymentService.isActive()) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Payment provider not configured"
      });
    }
    const userId = (_b2 = (_a2 = ctx.session) == null ? void 0 : _a2.user) == null ? void 0 : _b2.id;
    const referrals = await ctx.database.referral.findMany({
      where: { referrerId: userId },
      include: {
        transactions: {
          select: {
            amount: true,
            id: true,
            type: true,
            status: true,
            referralId: true
          }
        }
      }
    });
    return referrals.reduce((total, referral) => {
      const commission = referral.transactions.reduce((sum, tx) => {
        if (tx.type === "REFERRAL" && tx.status === "COMPLETED") {
          return sum + parseFloat(tx.amount || "0") * COMMISSION_PERCENTAGE;
        }
        return sum;
      }, 0);
      return total + commission;
    }, 0).toString();
  }),
  findManyProducts: Trpc.procedurePublic.input(z.object({})).query(async () => {
    if (!PaymentService.isActive()) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Payment provider not configured"
      });
    }
    return PaymentService.findManyProducts();
  }),
  findManyPayments: Trpc.procedure.input(z.object({})).query(async ({ ctx, input }) => {
    var _a2, _b2;
    if (!PaymentService.isActive()) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Payment provider not configured"
      });
    }
    const userId = (_b2 = (_a2 = ctx.session) == null ? void 0 : _a2.user) == null ? void 0 : _b2.id;
    const user = await ctx.database.user.findFirstOrThrow({
      where: { id: userId }
    });
    return PaymentService.findManyPayments(user);
  }),
  findManySubscriptions: Trpc.procedure.input(z.object({})).query(async ({ ctx, input }) => {
    var _a2, _b2;
    if (!PaymentService.isActive()) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Payment provider not configured"
      });
    }
    const userId = (_b2 = (_a2 = ctx.session) == null ? void 0 : _a2.user) == null ? void 0 : _b2.id;
    const user = await ctx.database.user.findFirstOrThrow({
      where: { id: userId }
    });
    return PaymentService.findManySubscriptions(user);
  }),
  createPaymentLink: Trpc.procedure.input(
    z.object({
      productId: z.string(),
      phoneNumber: z.string().regex(/^(237|\\+237)?[6-9][0-9]{8}$/, "Veuillez entrer un numéro de téléphone Camerounais valide")
    })
  ).mutation(async ({ ctx, input }) => {
    var _a2, _b2;
    if (!PaymentService.isActive()) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Payment provider not configured"
      });
    }
    const userId = (_b2 = (_a2 = ctx.session) == null ? void 0 : _a2.user) == null ? void 0 : _b2.id;
    const user = await ctx.database.user.findFirstOrThrow({
      where: { id: userId }
    });
    const urlRedirection = Configuration.getBaseUrl();
    const url = await PaymentService.createPaymentLink({
      user,
      productId: input.productId,
      metadata: {
        userId: user.id
      },
      urlRedirection,
      phoneNumber: input.phoneNumber
    });
    return { url };
  })
});
var PaymentServer;
((PaymentServer2) => {
  PaymentServer2.trpcRouter = BillingRouter;
})(PaymentServer || (PaymentServer = {}));
const appRouter = Trpc.mergeRouters(
  createRouter(Trpc.createRouter, Trpc.procedurePublic),
  // the custom router, add your own routers here
  Trpc.createRouter({
    authentication: AuthenticationServer.trpcRouter,
    configuration: ConfigurationServer.trpcRouter,
    upload: UploadServer.trpcRouter,
    ai: AiServer.trpcRouter,
    email: EmailServer.trpcRouter,
    billing: PaymentServer.trpcRouter
  })
);
const handleRequest = async ({
  request
}) => {
  return fetchRequestHandler({
    endpoint: "/api/trpc",
    req: request,
    router: appRouter,
    createContext: (options) => Trpc.createContext(options)
  });
};
const loader = handleRequest;
const action = handleRequest;
const route19 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  action,
  loader
}, Symbol.toStringTag, { value: "Module" }));
const route20 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null
}, Symbol.toStringTag, { value: "Module" }));
function LoggedLayout() {
  const { isLoggedIn, isLoading } = useUserContext();
  const router = useNavigate();
  useEffect(() => {
    if (!isLoading && !isLoggedIn) {
      router("/login");
    }
  }, [isLoading, isLoggedIn]);
  if (isLoading) {
    return /* @__PURE__ */ jsx(MrbSplashScreen, {});
  }
  if (isLoggedIn) {
    return /* @__PURE__ */ jsx(NavigationLayout, { children: /* @__PURE__ */ jsx(Outlet, {}) });
  }
}
const route21 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: LoggedLayout
}, Symbol.toStringTag, { value: "Module" }));
function NotFound() {
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx(PageLayout, { isCentered: true, children: /* @__PURE__ */ jsx(
    Result,
    {
      status: "404",
      title: "404",
      subTitle: "Sorry, the page you visited does not exist.",
      extra: /* @__PURE__ */ jsx(Button, { type: "primary", children: /* @__PURE__ */ jsx(Link$1, { to: "/", children: "Back Home" }) })
    }
  ) }) });
}
const route22 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: NotFound
}, Symbol.toStringTag, { value: "Module" }));
function LandingPage() {
  const { isLoading } = useDesignSystem();
  const features = [
    {
      heading: `Premium Digital Skills Courses`,
      description: `Access high-quality courses teaching in-demand digital skills that can help you start earning online immediately`,
      icon: /* @__PURE__ */ jsx("i", { className: "las la-graduation-cap" })
    },
    {
      heading: `50% Commission on Referrals`,
      description: `Earn passive income by sharing SkillFlow with others - get 50% commission on every referral`,
      icon: /* @__PURE__ */ jsx("i", { className: "las la-hand-holding-usd" })
    },
    {
      heading: `Mobile Learning`,
      description: `Learn anytime, anywhere with our mobile-responsive platform optimized for on-the-go studying`,
      icon: /* @__PURE__ */ jsx("i", { className: "las la-mobile" })
    },
    {
      heading: `Secure Payments`,
      description: `Integrated Flutterwave payment system with bank-grade security ensures your transactions and earnings are always protected`,
      icon: /* @__PURE__ */ jsx("i", { className: "las la-lock" })
    },
    {
      heading: `Supportive Community`,
      description: `Join a network of ambitious learners sharing tips, opportunities and success stories`,
      icon: /* @__PURE__ */ jsx("i", { className: "las la-users" })
    },
    {
      heading: `Quick Start`,
      description: `Get started in minutes with social login via Facebook or TikTok and begin learning immediately`,
      icon: /* @__PURE__ */ jsx("i", { className: "las la-rocket" })
    }
  ];
  const testimonials = [
    {
      name: `Jean Paul`,
      designation: `Digital Marketing Freelancer`,
      content: `Within 2 months of joining SkillFlow, I learned Facebook Ads and landed my first client. Now I make 300,000 XAF monthly from my digital marketing services.`,
      avatar: "https://randomuser.me/api/portraits/men/5.jpg"
    },
    {
      name: `Marie Claire`,
      designation: `Affiliate Marketer`,
      content: `The affiliate program is amazing! I've earned over 500,000 XAF just by sharing SkillFlow with my network. The courses helped me understand digital marketing too.`,
      avatar: "https://randomuser.me/api/portraits/women/6.jpg"
    },
    {
      name: `Emmanuel`,
      designation: `Web Developer`,
      content: `SkillFlow taught me web development from scratch. Within 6 months, I was building websites for clients. Best investment I've ever made in myself.`,
      avatar: "https://randomuser.me/api/portraits/men/7.jpg"
    }
  ];
  const navItems = [
    {
      title: `Features`,
      link: `#features`
    },
    {
      title: `Pricing`,
      link: `#pricing`
    },
    {
      title: `FAQ`,
      link: `#faq`
    }
  ];
  const packages = [
    {
      title: `Basic Access`,
      description: `Perfect for beginners starting their digital skills journey`,
      monthly: 0,
      yearly: 0,
      features: [
        `Access to 5 basic courses`,
        `Community access`,
        `Mobile learning`
      ]
    },
    {
      title: `Pro Access`,
      description: `Most popular choice for serious learners`,
      monthly: 3e3,
      yearly: 3e4,
      features: [
        `Access to all courses`,
        `Priority support`,
        `Affiliate program access`,
        `Certification`
      ],
      highlight: true
    }
  ];
  const questionAnswers = [
    {
      question: `How quickly can I start earning?`,
      answer: `Many of our students start earning within 2-3 months of consistent learning and practice. The timeline varies based on the skill you choose and your dedication.`
    },
    {
      question: `Do I need any prior experience?`,
      answer: `No prior experience needed! Our courses start from the basics and gradually progress to advanced concepts.`
    },
    {
      question: `How does the affiliate program work?`,
      answer: `You earn 50% commission on every person who joins through your referral link. Earnings are automatically tracked and paid to your wallet.`
    },
    {
      question: `Can I access courses on mobile?`,
      answer: `Yes! Our platform is fully mobile-responsive. Learn on any device, anytime, anywhere.`
    }
  ];
  const steps = [
    {
      heading: `Choose Your Skill Path`,
      description: `Select from our curated collection of in-demand digital skills courses`
    },
    {
      heading: `Learn at Your Pace`,
      description: `Access course content 24/7 and learn according to your schedule`
    },
    {
      heading: `Practice Real Projects`,
      description: `Apply your skills on practical projects that prepare you for real work`
    },
    {
      heading: `Start Earning`,
      description: `Use your new skills to find clients or earn through our affiliate program`
    }
  ];
  const painPoints = [
    {
      emoji: `😫`,
      title: `Struggling to find stable income opportunities`
    },
    {
      emoji: `😔`,
      title: `Feeling left behind in the digital economy`
    },
    {
      emoji: `😤`,
      title: `Frustrated with expensive courses that don't deliver results`
    }
  ];
  return /* @__PURE__ */ jsx(ErrorBoundary, { children: /* @__PURE__ */ jsx(PageLayout, { isLoading, children: /* @__PURE__ */ jsxs(LandingContainer, { navItems, children: [
    /* @__PURE__ */ jsx(
      LandingHero,
      {
        title: `Transform Your Skills into Income in the Digital Economy`,
        subtitle: `Join thousands of young Africans learning high-income digital skills and earning through our 50% commission affiliate program`,
        buttonText: `Start Learning Today`,
        buttonLink: `/skillfeed`,
        pictureUrl: `https://marblism-dashboard-api--production-public.s3.us-west-1.amazonaws.com/gDTGyB-skillaff-wHLz`,
        socialProof: /* @__PURE__ */ jsx(
          LandingSocialRating,
          {
            numberOfUsers: 1e3,
            suffixText: `successful learners`
          }
        )
      }
    ),
    /* @__PURE__ */ jsx(LandingSocialProof, { title: `Featured on` }),
    /* @__PURE__ */ jsx(
      LandingPainPoints,
      {
        title: `77% of young Africans want to learn new skills but don't know where to start`,
        painPoints
      }
    ),
    /* @__PURE__ */ jsx(
      LandingHowItWorks,
      {
        title: `Your Journey to Digital Income`,
        steps
      }
    ),
    /* @__PURE__ */ jsx(
      LandingFeatures,
      {
        id: "features",
        title: `Everything You Need to Succeed in the Digital Economy`,
        subtitle: `Built specifically for ambitious young Africans looking to generate income through digital skills`,
        features
      }
    ),
    /* @__PURE__ */ jsx(
      LandingTestimonials,
      {
        title: `Join Thousands Already Building Their Digital Future`,
        subtitle: `See how SkillFlow is helping young Africans transform their lives through digital skills`,
        testimonials
      }
    ),
    /* @__PURE__ */ jsx(
      LandingPricing,
      {
        id: "pricing",
        title: `Affordable Investment in Your Future`,
        subtitle: `Choose the plan that matches your goals`,
        packages
      }
    ),
    /* @__PURE__ */ jsx(
      LandingFAQ,
      {
        id: "faq",
        title: `Common Questions`,
        subtitle: `Everything you need to know about getting started`,
        questionAnswers
      }
    ),
    /* @__PURE__ */ jsx(
      LandingCTA,
      {
        title: `Start Your Digital Success Journey Today`,
        subtitle: `Join 1000+ learners already building their future with SkillFlow`,
        buttonText: `Get Started Now`,
        buttonLink: `/register`
      }
    )
  ] }) }) });
}
const route23 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: LandingPage
}, Symbol.toStringTag, { value: "Module" }));
const serverManifest = { "entry": { "module": "/assets/entry.client-uWxq5ryM.js", "imports": ["/assets/index-Bhhhx7h4.js", "/assets/index-CeUTncnb.js", "/assets/index-DWrdUq8q.js", "/assets/components-BAyeFLBh.js"], "css": ["/assets/entry-8mTYGNPl.css"] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/root-CeNVPPIm.js", "imports": ["/assets/index-Bhhhx7h4.js", "/assets/index-CeUTncnb.js", "/assets/index-DWrdUq8q.js", "/assets/components-BAyeFLBh.js", "/assets/root-BCFgc1Xr.js", "/assets/useUserContext-ltZQ69X3.js", "/assets/index-CWUlnviP.js", "/assets/provider-RLEbTht8.js", "/assets/index-C7Q2D2Yy.js", "/assets/index-BzyPBYP5.js"], "css": ["/assets/entry-8mTYGNPl.css"] }, "routes/_logged.admin.courses.$courseId.edit": { "id": "routes/_logged.admin.courses.$courseId.edit", "parentId": "routes/_logged", "path": "admin/courses/:courseId/edit", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/route-DJLp6ZkF.js", "imports": ["/assets/index-Bhhhx7h4.js", "/assets/index-CWUlnviP.js", "/assets/provider-RLEbTht8.js", "/assets/index-q-G7H0tu.js", "/assets/index-CH34cjkL.js", "/assets/index-CeUTncnb.js", "/assets/index-C8qbBouM.js", "/assets/index-C6x-598G.js", "/assets/index-C7Q2D2Yy.js", "/assets/index-BzyPBYP5.js", "/assets/index-CY1kBE-P.js", "/assets/Pagination-D2AnF2UC.js", "/assets/index-D28acUWU.js", "/assets/index-DqVK0OKb.js", "/assets/Table-D46c5F71.js", "/assets/index-CzA3G1Dw.js", "/assets/collapse-BbEVqHco.js", "/assets/fade-BYpxbwFh.js", "/assets/useBreakpoint-CiMsAa-F.js", "/assets/responsiveObserver-CzlRrsiN.js", "/assets/DeleteOutlined-CXav3FED.js", "/assets/SearchOutlined-ADv_U9mc.js", "/assets/row-B-zWIMNx.js", "/assets/EllipsisOutlined-Bce2vzrs.js", "/assets/index-LQraNpB7.js", "/assets/Dropdown-EsR9A278.js", "/assets/index-B0p7av3r.js", "/assets/useClosable-Bdp6jF3W.js"], "css": [] }, "routes/_logged.courses.$courseId.preview": { "id": "routes/_logged.courses.$courseId.preview", "parentId": "routes/_logged", "path": "courses/:courseId/preview", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/route-CC4KqmXp.js", "imports": ["/assets/index-Bhhhx7h4.js", "/assets/useUserContext-ltZQ69X3.js", "/assets/index-CWUlnviP.js", "/assets/provider-RLEbTht8.js", "/assets/index-CH34cjkL.js", "/assets/index-CeUTncnb.js", "/assets/index-C7Q2D2Yy.js", "/assets/index-D28acUWU.js", "/assets/index-cPgcPs25.js", "/assets/index-BzyPBYP5.js", "/assets/index-C6x-598G.js", "/assets/Pagination-D2AnF2UC.js", "/assets/useBreakpoint-CiMsAa-F.js", "/assets/responsiveObserver-CzlRrsiN.js", "/assets/EllipsisOutlined-Bce2vzrs.js", "/assets/index-LQraNpB7.js", "/assets/SearchOutlined-ADv_U9mc.js", "/assets/row-B-zWIMNx.js", "/assets/Dropdown-EsR9A278.js", "/assets/index-BHyeewtM.js"], "css": [] }, "routes/_auth.reset-password.$token_": { "id": "routes/_auth.reset-password.$token_", "parentId": "root", "path": "reset-password/:token", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/route-LHy3YPzh.js", "imports": ["/assets/index-Bhhhx7h4.js", "/assets/index-CWUlnviP.js", "/assets/provider-RLEbTht8.js", "/assets/index-CeUTncnb.js", "/assets/index-C8qbBouM.js", "/assets/index-C7Q2D2Yy.js", "/assets/index-HjNU2j5p.js", "/assets/index-9K41UzrV.js", "/assets/index-BzyPBYP5.js", "/assets/SearchOutlined-ADv_U9mc.js", "/assets/collapse-BbEVqHco.js", "/assets/row-B-zWIMNx.js", "/assets/responsiveObserver-CzlRrsiN.js", "/assets/index-bZIECVya.js"], "css": [] }, "routes/_logged.admin.control-panel_": { "id": "routes/_logged.admin.control-panel_", "parentId": "routes/_logged", "path": "admin/control-panel", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/route-BomCcYkm.js", "imports": ["/assets/index-Bhhhx7h4.js", "/assets/useUserContext-ltZQ69X3.js", "/assets/provider-RLEbTht8.js", "/assets/index-CWUlnviP.js", "/assets/index-C8qbBouM.js", "/assets/index-C7Q2D2Yy.js", "/assets/index-BHyeewtM.js", "/assets/Pagination-D2AnF2UC.js", "/assets/Table-D46c5F71.js", "/assets/index-CzA3G1Dw.js", "/assets/index-CY1kBE-P.js", "/assets/index-BzyPBYP5.js", "/assets/DeleteOutlined-CXav3FED.js", "/assets/index-CeUTncnb.js", "/assets/index-C6x-598G.js", "/assets/SearchOutlined-ADv_U9mc.js", "/assets/collapse-BbEVqHco.js", "/assets/row-B-zWIMNx.js", "/assets/responsiveObserver-CzlRrsiN.js", "/assets/EllipsisOutlined-Bce2vzrs.js", "/assets/Dropdown-EsR9A278.js", "/assets/useBreakpoint-CiMsAa-F.js", "/assets/index-LQraNpB7.js", "/assets/index-B0p7av3r.js", "/assets/index-DqVK0OKb.js", "/assets/useClosable-Bdp6jF3W.js", "/assets/fade-BYpxbwFh.js"], "css": [] }, "routes/_logged.courses.$courseId_": { "id": "routes/_logged.courses.$courseId_", "parentId": "routes/_logged", "path": "courses/:courseId", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/route-CiQkwJO6.js", "imports": ["/assets/index-Bhhhx7h4.js", "/assets/useUserContext-ltZQ69X3.js", "/assets/index-CWUlnviP.js", "/assets/provider-RLEbTht8.js", "/assets/index-CH34cjkL.js", "/assets/index-CeUTncnb.js", "/assets/index-C7Q2D2Yy.js", "/assets/index-D28acUWU.js", "/assets/index-cPgcPs25.js", "/assets/index-CzA3G1Dw.js", "/assets/index-BzyPBYP5.js", "/assets/index-C6x-598G.js", "/assets/Pagination-D2AnF2UC.js", "/assets/useBreakpoint-CiMsAa-F.js", "/assets/responsiveObserver-CzlRrsiN.js", "/assets/EllipsisOutlined-Bce2vzrs.js", "/assets/index-LQraNpB7.js", "/assets/SearchOutlined-ADv_U9mc.js", "/assets/row-B-zWIMNx.js", "/assets/Dropdown-EsR9A278.js", "/assets/index-BHyeewtM.js", "/assets/useClosable-Bdp6jF3W.js", "/assets/fade-BYpxbwFh.js"], "css": [] }, "routes/_auth.reset-password_": { "id": "routes/_auth.reset-password_", "parentId": "root", "path": "reset-password", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/route-D56-07kJ.js", "imports": ["/assets/index-Bhhhx7h4.js", "/assets/index-CWUlnviP.js", "/assets/index-HjNU2j5p.js", "/assets/index-CeUTncnb.js", "/assets/index-C8qbBouM.js", "/assets/index-C7Q2D2Yy.js", "/assets/index-9K41UzrV.js", "/assets/index-BzyPBYP5.js", "/assets/index-bZIECVya.js", "/assets/SearchOutlined-ADv_U9mc.js", "/assets/collapse-BbEVqHco.js", "/assets/row-B-zWIMNx.js", "/assets/responsiveObserver-CzlRrsiN.js"], "css": [] }, "routes/_logged.my-courses_": { "id": "routes/_logged.my-courses_", "parentId": "routes/_logged", "path": "my-courses", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/route-BgLW_9Od.js", "imports": ["/assets/index-Bhhhx7h4.js", "/assets/useUserContext-ltZQ69X3.js", "/assets/index-CWUlnviP.js", "/assets/provider-RLEbTht8.js", "/assets/index-CeUTncnb.js", "/assets/index-BzyPBYP5.js", "/assets/index-C7Q2D2Yy.js", "/assets/row-B-zWIMNx.js", "/assets/index-cPgcPs25.js", "/assets/index-C6x-598G.js", "/assets/responsiveObserver-CzlRrsiN.js", "/assets/Dropdown-EsR9A278.js", "/assets/index-BHyeewtM.js", "/assets/EllipsisOutlined-Bce2vzrs.js"], "css": [] }, "routes/_logged.skillfeed_": { "id": "routes/_logged.skillfeed_", "parentId": "routes/_logged", "path": "skillfeed", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/route-BL7AcSTa.js", "imports": ["/assets/index-Bhhhx7h4.js", "/assets/index-CWUlnviP.js", "/assets/provider-RLEbTht8.js", "/assets/index-C7Q2D2Yy.js", "/assets/index-C6x-598G.js", "/assets/index-BzyPBYP5.js", "/assets/row-B-zWIMNx.js", "/assets/responsiveObserver-CzlRrsiN.js"], "css": [] }, "routes/api.upload.private": { "id": "routes/api.upload.private", "parentId": "root", "path": "api/upload/private", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/api.upload.private-l0sNRNKZ.js", "imports": [], "css": [] }, "routes/_logged.settings_": { "id": "routes/_logged.settings_", "parentId": "routes/_logged", "path": "settings", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/route-BdoUCLzv.js", "imports": ["/assets/index-Bhhhx7h4.js", "/assets/useUserContext-ltZQ69X3.js", "/assets/index-CWUlnviP.js", "/assets/provider-RLEbTht8.js", "/assets/index-C8qbBouM.js", "/assets/index-BzyPBYP5.js", "/assets/index-C7Q2D2Yy.js", "/assets/row-B-zWIMNx.js", "/assets/index-cPgcPs25.js", "/assets/index-DqVK0OKb.js", "/assets/index-C6x-598G.js", "/assets/SearchOutlined-ADv_U9mc.js", "/assets/collapse-BbEVqHco.js", "/assets/responsiveObserver-CzlRrsiN.js", "/assets/Dropdown-EsR9A278.js", "/assets/index-BHyeewtM.js", "/assets/EllipsisOutlined-Bce2vzrs.js"], "css": [] }, "routes/api.upload.public": { "id": "routes/api.upload.public", "parentId": "root", "path": "api/upload/public", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/api.upload.public-l0sNRNKZ.js", "imports": [], "css": [] }, "routes/_logged.courses_": { "id": "routes/_logged.courses_", "parentId": "routes/_logged", "path": "courses", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/route-BKScEbBt.js", "imports": ["/assets/index-Bhhhx7h4.js", "/assets/useUserContext-ltZQ69X3.js", "/assets/index-CWUlnviP.js", "/assets/provider-RLEbTht8.js", "/assets/index-CH34cjkL.js", "/assets/index-CeUTncnb.js", "/assets/index-C7Q2D2Yy.js", "/assets/index-cPgcPs25.js", "/assets/row-B-zWIMNx.js", "/assets/index-BzyPBYP5.js", "/assets/index-C6x-598G.js", "/assets/Dropdown-EsR9A278.js", "/assets/index-BHyeewtM.js", "/assets/EllipsisOutlined-Bce2vzrs.js", "/assets/responsiveObserver-CzlRrsiN.js"], "css": [] }, "routes/_logged.pricing_": { "id": "routes/_logged.pricing_", "parentId": "routes/_logged", "path": "pricing", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/route-CZKHKSSS.js", "imports": ["/assets/index-Bhhhx7h4.js", "/assets/index-CWUlnviP.js", "/assets/provider-RLEbTht8.js", "/assets/row-B-zWIMNx.js", "/assets/index-LQraNpB7.js", "/assets/index-cPgcPs25.js", "/assets/index-C7Q2D2Yy.js", "/assets/index-BSzoOTG-.js", "/assets/index-C6x-598G.js", "/assets/index-BzyPBYP5.js", "/assets/responsiveObserver-CzlRrsiN.js", "/assets/Dropdown-EsR9A278.js", "/assets/index-BHyeewtM.js", "/assets/EllipsisOutlined-Bce2vzrs.js", "/assets/useClosable-Bdp6jF3W.js"], "css": [] }, "routes/_logged.profile_": { "id": "routes/_logged.profile_", "parentId": "routes/_logged", "path": "profile", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/route-DOznnJ-_.js", "imports": ["/assets/index-Bhhhx7h4.js", "/assets/useUserContext-ltZQ69X3.js", "/assets/index-C7KOCkDY.js", "/assets/index-CWUlnviP.js", "/assets/provider-RLEbTht8.js", "/assets/index-q-G7H0tu.js", "/assets/index-C8qbBouM.js", "/assets/index-C7Q2D2Yy.js", "/assets/index-vFrpDYpR.js", "/assets/index-C6x-598G.js", "/assets/index-BzyPBYP5.js", "/assets/collapse-BbEVqHco.js", "/assets/fade-BYpxbwFh.js", "/assets/useBreakpoint-CiMsAa-F.js", "/assets/responsiveObserver-CzlRrsiN.js", "/assets/DeleteOutlined-CXav3FED.js", "/assets/SearchOutlined-ADv_U9mc.js", "/assets/row-B-zWIMNx.js"], "css": [] }, "routes/_logged.upgrade_": { "id": "routes/_logged.upgrade_", "parentId": "routes/_logged", "path": "upgrade", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/route-ERod1HfO.js", "imports": ["/assets/index-Bhhhx7h4.js", "/assets/useUserContext-ltZQ69X3.js", "/assets/index-CWUlnviP.js", "/assets/provider-RLEbTht8.js", "/assets/index-CeUTncnb.js", "/assets/index-BzyPBYP5.js", "/assets/index-C7Q2D2Yy.js", "/assets/row-B-zWIMNx.js", "/assets/index-cPgcPs25.js", "/assets/index-C6x-598G.js", "/assets/responsiveObserver-CzlRrsiN.js", "/assets/Dropdown-EsR9A278.js", "/assets/index-BHyeewtM.js", "/assets/EllipsisOutlined-Bce2vzrs.js"], "css": [] }, "routes/_auth.register_": { "id": "routes/_auth.register_", "parentId": "root", "path": "register", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/route-C96qUM9D.js", "imports": ["/assets/index-Bhhhx7h4.js", "/assets/index-C7KOCkDY.js", "/assets/index-CWUlnviP.js", "/assets/index-HjNU2j5p.js", "/assets/index-CeUTncnb.js", "/assets/index-DWrdUq8q.js", "/assets/index-C8qbBouM.js", "/assets/index-C7Q2D2Yy.js", "/assets/index-BzyPBYP5.js", "/assets/index-bZIECVya.js", "/assets/SearchOutlined-ADv_U9mc.js", "/assets/collapse-BbEVqHco.js", "/assets/row-B-zWIMNx.js", "/assets/responsiveObserver-CzlRrsiN.js"], "css": [] }, "routes/_logged.wallet": { "id": "routes/_logged.wallet", "parentId": "routes/_logged", "path": "wallet", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/route-Y3dhlpoF.js", "imports": ["/assets/index-Bhhhx7h4.js", "/assets/useUserContext-ltZQ69X3.js", "/assets/index-CWUlnviP.js", "/assets/provider-RLEbTht8.js", "/assets/index-C8qbBouM.js", "/assets/row-B-zWIMNx.js", "/assets/index-cPgcPs25.js", "/assets/index-C7Q2D2Yy.js", "/assets/Table-D46c5F71.js", "/assets/index-CzA3G1Dw.js", "/assets/index-BzyPBYP5.js", "/assets/index-C6x-598G.js", "/assets/SearchOutlined-ADv_U9mc.js", "/assets/collapse-BbEVqHco.js", "/assets/responsiveObserver-CzlRrsiN.js", "/assets/Dropdown-EsR9A278.js", "/assets/index-BHyeewtM.js", "/assets/EllipsisOutlined-Bce2vzrs.js", "/assets/Pagination-D2AnF2UC.js", "/assets/useBreakpoint-CiMsAa-F.js", "/assets/index-LQraNpB7.js", "/assets/index-B0p7av3r.js", "/assets/index-DqVK0OKb.js", "/assets/useClosable-Bdp6jF3W.js", "/assets/fade-BYpxbwFh.js"], "css": [] }, "routes/_auth.login_": { "id": "routes/_auth.login_", "parentId": "root", "path": "login", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/route-vZK7H6sX.js", "imports": ["/assets/index-Bhhhx7h4.js", "/assets/index-CWUlnviP.js", "/assets/index-HjNU2j5p.js", "/assets/index-CeUTncnb.js", "/assets/index-DWrdUq8q.js", "/assets/index-C8qbBouM.js", "/assets/index-C7Q2D2Yy.js", "/assets/index-bZIECVya.js", "/assets/SearchOutlined-ADv_U9mc.js", "/assets/collapse-BbEVqHco.js", "/assets/row-B-zWIMNx.js", "/assets/responsiveObserver-CzlRrsiN.js"], "css": [] }, "routes/api.trpc.$": { "id": "routes/api.trpc.$", "parentId": "root", "path": "api/trpc/*", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/api.trpc._-l0sNRNKZ.js", "imports": [], "css": [] }, "routes/_logged_": { "id": "routes/_logged_", "parentId": "root", "path": void 0, "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/route-l0sNRNKZ.js", "imports": [], "css": [] }, "routes/_logged": { "id": "routes/_logged", "parentId": "root", "path": void 0, "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/_logged-Bm40zpP3.js", "imports": ["/assets/index-Bhhhx7h4.js", "/assets/useUserContext-ltZQ69X3.js", "/assets/index-CWUlnviP.js", "/assets/provider-RLEbTht8.js", "/assets/index-C7Q2D2Yy.js", "/assets/index-B0p7av3r.js", "/assets/index-C7KOCkDY.js", "/assets/index-bZIECVya.js", "/assets/index-CeUTncnb.js", "/assets/index-vFrpDYpR.js", "/assets/index-BSzoOTG-.js", "/assets/MenuOutlined-DhjoUD9T.js", "/assets/index-BzyPBYP5.js", "/assets/EllipsisOutlined-Bce2vzrs.js", "/assets/collapse-BbEVqHco.js", "/assets/responsiveObserver-CzlRrsiN.js", "/assets/useBreakpoint-CiMsAa-F.js", "/assets/useClosable-Bdp6jF3W.js"], "css": [] }, "routes/$404.$": { "id": "routes/$404.$", "parentId": "root", "path": ":404/*", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/_404._-Bymccv93.js", "imports": ["/assets/index-Bhhhx7h4.js", "/assets/provider-RLEbTht8.js", "/assets/index-C7Q2D2Yy.js", "/assets/components-BAyeFLBh.js", "/assets/index-C6x-598G.js", "/assets/index-BzyPBYP5.js", "/assets/index-DWrdUq8q.js", "/assets/index-CeUTncnb.js", "/assets/row-B-zWIMNx.js", "/assets/responsiveObserver-CzlRrsiN.js"], "css": [] }, "routes/_index": { "id": "routes/_index", "parentId": "root", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/_index-BWbDWb-U.js", "imports": ["/assets/index-Bhhhx7h4.js", "/assets/provider-RLEbTht8.js", "/assets/index-bZIECVya.js", "/assets/components-BAyeFLBh.js", "/assets/index-C7Q2D2Yy.js", "/assets/useUserContext-ltZQ69X3.js", "/assets/index-CeUTncnb.js", "/assets/MenuOutlined-DhjoUD9T.js", "/assets/index-BzyPBYP5.js", "/assets/index-C6x-598G.js", "/assets/index-DWrdUq8q.js", "/assets/index-CWUlnviP.js", "/assets/row-B-zWIMNx.js", "/assets/responsiveObserver-CzlRrsiN.js"], "css": [] } }, "url": "/assets/manifest-106becc2.js", "version": "106becc2" };
const mode = "production";
const assetsBuildDirectory = "build/client";
const basename = "/";
const future = { "v3_fetcherPersist": true, "v3_relativeSplatPath": true, "v3_throwAbortReason": true, "v3_routeConfig": false, "v3_singleFetch": true, "v3_lazyRouteDiscovery": true, "unstable_optimizeDeps": true };
const isSpaMode = false;
const publicPath = "/";
const entry = { module: entryServer };
const routes = {
  "root": {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: route0
  },
  "routes/_logged.admin.courses.$courseId.edit": {
    id: "routes/_logged.admin.courses.$courseId.edit",
    parentId: "routes/_logged",
    path: "admin/courses/:courseId/edit",
    index: void 0,
    caseSensitive: void 0,
    module: route1
  },
  "routes/_logged.courses.$courseId.preview": {
    id: "routes/_logged.courses.$courseId.preview",
    parentId: "routes/_logged",
    path: "courses/:courseId/preview",
    index: void 0,
    caseSensitive: void 0,
    module: route2
  },
  "routes/_auth.reset-password.$token_": {
    id: "routes/_auth.reset-password.$token_",
    parentId: "root",
    path: "reset-password/:token",
    index: void 0,
    caseSensitive: void 0,
    module: route3
  },
  "routes/_logged.admin.control-panel_": {
    id: "routes/_logged.admin.control-panel_",
    parentId: "routes/_logged",
    path: "admin/control-panel",
    index: void 0,
    caseSensitive: void 0,
    module: route4
  },
  "routes/_logged.courses.$courseId_": {
    id: "routes/_logged.courses.$courseId_",
    parentId: "routes/_logged",
    path: "courses/:courseId",
    index: void 0,
    caseSensitive: void 0,
    module: route5
  },
  "routes/_auth.reset-password_": {
    id: "routes/_auth.reset-password_",
    parentId: "root",
    path: "reset-password",
    index: void 0,
    caseSensitive: void 0,
    module: route6
  },
  "routes/_logged.my-courses_": {
    id: "routes/_logged.my-courses_",
    parentId: "routes/_logged",
    path: "my-courses",
    index: void 0,
    caseSensitive: void 0,
    module: route7
  },
  "routes/_logged.skillfeed_": {
    id: "routes/_logged.skillfeed_",
    parentId: "routes/_logged",
    path: "skillfeed",
    index: void 0,
    caseSensitive: void 0,
    module: route8
  },
  "routes/api.upload.private": {
    id: "routes/api.upload.private",
    parentId: "root",
    path: "api/upload/private",
    index: void 0,
    caseSensitive: void 0,
    module: route9
  },
  "routes/_logged.settings_": {
    id: "routes/_logged.settings_",
    parentId: "routes/_logged",
    path: "settings",
    index: void 0,
    caseSensitive: void 0,
    module: route10
  },
  "routes/api.upload.public": {
    id: "routes/api.upload.public",
    parentId: "root",
    path: "api/upload/public",
    index: void 0,
    caseSensitive: void 0,
    module: route11
  },
  "routes/_logged.courses_": {
    id: "routes/_logged.courses_",
    parentId: "routes/_logged",
    path: "courses",
    index: void 0,
    caseSensitive: void 0,
    module: route12
  },
  "routes/_logged.pricing_": {
    id: "routes/_logged.pricing_",
    parentId: "routes/_logged",
    path: "pricing",
    index: void 0,
    caseSensitive: void 0,
    module: route13
  },
  "routes/_logged.profile_": {
    id: "routes/_logged.profile_",
    parentId: "routes/_logged",
    path: "profile",
    index: void 0,
    caseSensitive: void 0,
    module: route14
  },
  "routes/_logged.upgrade_": {
    id: "routes/_logged.upgrade_",
    parentId: "routes/_logged",
    path: "upgrade",
    index: void 0,
    caseSensitive: void 0,
    module: route15
  },
  "routes/_auth.register_": {
    id: "routes/_auth.register_",
    parentId: "root",
    path: "register",
    index: void 0,
    caseSensitive: void 0,
    module: route16
  },
  "routes/_logged.wallet": {
    id: "routes/_logged.wallet",
    parentId: "routes/_logged",
    path: "wallet",
    index: void 0,
    caseSensitive: void 0,
    module: route17
  },
  "routes/_auth.login_": {
    id: "routes/_auth.login_",
    parentId: "root",
    path: "login",
    index: void 0,
    caseSensitive: void 0,
    module: route18
  },
  "routes/api.trpc.$": {
    id: "routes/api.trpc.$",
    parentId: "root",
    path: "api/trpc/*",
    index: void 0,
    caseSensitive: void 0,
    module: route19
  },
  "routes/_logged_": {
    id: "routes/_logged_",
    parentId: "root",
    path: void 0,
    index: void 0,
    caseSensitive: void 0,
    module: route20
  },
  "routes/_logged": {
    id: "routes/_logged",
    parentId: "root",
    path: void 0,
    index: void 0,
    caseSensitive: void 0,
    module: route21
  },
  "routes/$404.$": {
    id: "routes/$404.$",
    parentId: "root",
    path: ":404/*",
    index: void 0,
    caseSensitive: void 0,
    module: route22
  },
  "routes/_index": {
    id: "routes/_index",
    parentId: "root",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: route23
  }
};
export {
  serverManifest as assets,
  assetsBuildDirectory,
  basename,
  entry,
  future,
  isSpaMode,
  mode,
  publicPath,
  routes
};
