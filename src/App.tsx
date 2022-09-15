import Select from './component/select'

function App() {

  return (
    <Select value={''} onChange={()=>{
      console.log('change')
    }} options={[
      {label: 'Hello There1', value: 'Hello There1'},
      {label: 'Felix2', value: 'Felix2'},
      {label: 'Dusengimana3', value: 'Dusengimana3'},
      {label: 'Hello There4', value: 'Hello There4'},
      {label: 'Felix5', value: 'Felix5'},
      {label: 'Dusengimana6', value: 'Dusengimana6'},
    ]}/>
  )
}

export default App
