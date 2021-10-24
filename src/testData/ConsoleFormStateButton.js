const { useFormContext } = require("react-hook-form")


export const ConsoleFormStateButton = () => {
  const { getValues, formState : { errors } } = useFormContext()

  const consoleFormState = () => {
    console.log('Form state - ', getValues())
  }

  const consoleErrorState = () => {
    console.log('Form errors', errors )
  }

  return (
    <>
      <button style={{ position: 'sticky', bottom: 20, left: 20, backgroundColor: 'green', borderRadius: '20px', color: 'white' }} onClick={consoleFormState}>Form state</button>
      <button style={{ position: 'sticky', bottom: 20, left: 110, backgroundColor: 'green', borderRadius: '20px', color: 'white' }} onClick={consoleErrorState}>Form errors</button>
    </>
  )
}