import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState
} from "react"
import classes from "../styles/ConfirmProvider.module.scss"

const ConfirmCtx = createContext(null)

export function ConfirmProvider({ children }) {
  const [modal, setModal] = useState(null)

  const confirm = useCallback(
    ({
      title = "⚙ Public demo",
      message = "You're about to change the live demo for everyone. Bold move. Continue?",
      confirmText = "Continue",
      cancelText = "Cancel"
    } = {}) => {
      return new Promise((resolve) =>
        setModal({ title, message, confirmText, cancelText, resolve })
      )
    },
    []
  )

  const value = useMemo(() => ({ confirm }), [confirm])

  const close = (result) => {
    modal?.resolve(result)
    setModal(null)
  }

  return (
    <ConfirmCtx.Provider value={value}>
      {children}
      {modal && (
        <div className={classes.confirmBackdrop}>
          <div className={classes.confirmCard}>
            <h3 className={classes.confirmTitle}>{modal.title}</h3>
            <p className={classes.confirmMessage}>{modal.message}</p>
            <div className={classes.confirmActions}>
              <button className={classes.btnSec} onClick={() => close(false)}>
                {modal.cancelText}
              </button>
              <button className={classes.btnPri} onClick={() => close(true)}>
                {modal.confirmText}
              </button>
            </div>
          </div>
        </div>
      )}
    </ConfirmCtx.Provider>
  )
}

export function useConfirm() {
  const ctx = useContext(ConfirmCtx)
  if (!ctx) throw new Error("useConfirm must be used inside ConfirmProvider")
  return ctx.confirm
}
