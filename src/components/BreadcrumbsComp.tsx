import { Breadcrumb } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';

type BreadcrumbsCompProps ={
    openPageName : string
}

const BreadcrumbsComp = ({openPageName}:BreadcrumbsCompProps) => {
    const location = useLocation();
    const paths = location.pathname.split('/').filter(Boolean);

    return (
        <Breadcrumb>
            <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/' }}>
                Home
            </Breadcrumb.Item>

            {paths.map((segment, index) => {
                const path = '/' + paths.slice(0, index + 1).join('/');
                const isLast = index === paths.length - 1;

                return isLast ? (
                    <Breadcrumb.Item active key={path}>
                        {openPageName}
                    </Breadcrumb.Item>
                ) : (
                    <Breadcrumb.Item linkAs={Link} linkProps={{ to: path }} key={path}>
                        {decodeURIComponent(segment)}
                    </Breadcrumb.Item>
                );
            })}
        </Breadcrumb>
    );
};

export default BreadcrumbsComp;
