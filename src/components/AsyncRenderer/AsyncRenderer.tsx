import { observer } from "mobx-react-lite";
import { type IPromiseBasedObservable } from "mobx-utils";


interface IAsyncRendererProps<T> {
    value: IPromiseBasedObservable<T>;
    pending?: () => React.ReactNode;
    rejected?: (error: any) => React.ReactNode;
    fulfilled: (value: T) => React.ReactNode;
}

export const AsyncRenderer = observer(<T,>(props: IAsyncRendererProps<T>) => {
    const { value, fulfilled } = props;

    return value?.case({
        fulfilled,
    });
});