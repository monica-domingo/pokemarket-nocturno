export interface DataItemProps {
    title: string;
    description: string;
    price: string;
    email: string;
    image: string;
}

export interface ItemProps extends DataItemProps {
    id: string;
}