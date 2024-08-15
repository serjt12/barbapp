import { startLoading, stopLoading } from "./loadingSlice";

const loadingMiddleware = (store) => (next) => (action) => {
    const { type } = action;

    // Identify async action types (pending, fulfilled, rejected)
    const isPending = type.endsWith("/pending");
    const isFulfilled = type.endsWith("/fulfilled");
    const isRejected = type.endsWith("/rejected");

    if (isPending) {
        store.dispatch(startLoading());
    } else if (isFulfilled || isRejected) {
        store.dispatch(stopLoading());
    }

    return next(action);
};

export default loadingMiddleware;
