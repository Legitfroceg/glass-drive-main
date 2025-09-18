declare global {
  interface Window {
    /**
     * Navigate to the auth page with a custom redirect URL
     * @param redirectUrl - URL to redirect to after successful authentication
     */
    navigateToAuth: (redirectUrl: string) => void;
  }
}

declare module "@/pages/About.jsx" {
  const Component: any;
  export default Component;
}

declare module "@/pages/Contact.jsx" {
  const Component: any;
  export default Component;
}

declare module "@/pages/Landing.jsx" {
  const Component: any;
  export default Component;
}

declare module "@/pages/Auth.jsx" {
  const Component: any;
  export default Component;
}

declare module "@/pages/Dashboard.jsx" {
  const Component: any;
  export default Component;
}

declare module "@/pages/AdminDashboard.jsx" {
  const Component: any;
  export default Component;
}

declare module "@/pages/NotFound.jsx" {
  const Component: any;
  export default Component;
}

// Fallback wildcard for any additional JSX pages
declare module "@/pages/*.jsx" {
  const Component: any;
  export default Component;
}

// Add a general fallback so any .jsx import is typed
declare module "*.jsx" {
  const Component: any;
  export default Component;
}

export {};