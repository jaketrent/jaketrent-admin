
function formatFieldName(err, replaceDataStr) {
  if (replaceDataStr)
    return err.source.pointer.replace(/^\/data/, replaceDataStr)
  else
    return err.source.pointer
}

export default function deserializeErrors(res, replaceDataStr) {
  if (!res.data || !res.status)
    throw new Error('Response body (data) and code (status) are required')

  if (!res.data.errors)
    return []

  return res.data.errors.map(err => {
    var formattedErr = {
      detail: err.detail,
      code: res.status
    }
    if (err.source && err.source.pointer)
      formattedErr.field = formatFieldName(err, replaceDataStr)
    return formattedErr
  })
}
