export function parseParameters(params) {
    const { page = {}, ...reset } = params;
    const { current = 1, pageSize = 10 } = page;

    return {
        pageNum: current,
        pageSize,
        ...reset
    }
}