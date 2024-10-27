'use client'; // Indicates this component should run on the client-side
import { SessionProvider } from "next-auth/react";

// Update the component name to follow PascalCase convention
const SessionWrapper = ({ children, session }) => {
    return (
        <SessionProvider session={session}>
            {children}
        </SessionProvider>
    );
};

export default SessionWrapper;
