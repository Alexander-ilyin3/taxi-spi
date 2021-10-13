const { useFormContext } = require("react-hook-form")


export const ConsoleFormStateButton = () => {
  const { getValues } = useFormContext()
  
  const consoleFormState = () => {
    console.log('Form state - ', getValues())
  }
  
  return (
    <button style={{position: 'sticky', bottom: 20, left: 20, backgroundColor: 'green', borderRadius: '20px', color: 'white'}} onClick={consoleFormState}>Form state</button>
  )
}