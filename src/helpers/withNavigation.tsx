import Navigation from '@/components/Navigation';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
interface IWithNavigation {
	location: ReturnType<typeof useLocation>;
	params: Record<string, string>;
	navigate: ReturnType<typeof useNavigate>;
}
function withNavigation(Component: React.ComponentType<IWithNavigation>) {
   function ComponentWithRouterProp(props:IWithNavigation) {
      return (
         <>
            <Navigation/>
            <Component {...props} />
         </>
         
      )
   }
   return ComponentWithRouterProp;
}

export default withNavigation;
