import { useState, useEffect, useRef } from "react";
import { Form, Image as Img, Button, Table, Spinner } from "react-bootstrap";

function Employees() {

  // TODO: Load data from backend service
  const [ employees, setEmployees ] = useState([]);
  const [ loading, setLoading ] = useState(true);
  const url = process.env.REACT_APP_EMPLOYEES_DB_URL;
  const avatarImageSize={ width: 128, height: 128 };
  
  const initialEmployee={
    first_name: undefined,
    last_name: undefined,
    email: undefined,
    avatar: undefined
  };

  let newEmployee = {...initialEmployee};

  const nameInputRef = useRef();
  const emailInputRef = useRef();
  const avatarUrlInputRef = useRef();
  const avatarFileInputRef = useRef();
  const avatarImageRef = useRef();

  const namePattern = `([A-Za-z]{1,}(\\.[ ])?[ \\-A-Za-z]{1,})+,([ ]?[\\-A-Za-z]{1,}(\\.)?)+`;
  const emailPattern = `[A-Za-z]{2,}(\\.[A-Za-z]+)?@[A-Za-z]{2,}\\.[A-Za-z]{2,24}`;
  const urlPattern = `http(s)?://.*\\.(png|jpeg|jpg)+.*`;
  const defaultAvatarURI = "data:image/png;base64,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";

  useEffect(()=>{
    fetch(url)
      .then(res=>res.json())
      .then(json=>setEmployees(json.data))
      .then(()=>setLoading(false))
  },[url]);

  const getFileContent = (e)=>{
    e.stopPropagation();
    e.preventDefault();
    let file;
    if (e.dataTransfer?.files) {
        file = [...e.dataTransfer.files][0];
        avatarFileInputRef.current.value=''
        avatarUrlInputRef.current.value=''
    } else if (e.dataTransfer?.items) {
        file = [...e.dataTransfer.items][0];
        avatarFileInputRef.current.value=''
        avatarUrlInputRef.current.value=''
    } else if(avatarFileInputRef.current.files[0]) {
        file = avatarFileInputRef.current.files[0];
        avatarUrlInputRef.current.value=''
    }else {
      return;
    }
    handleImageContent(file,setAvatar);

  };
  const getUrlContent=(e)=>{
    e.stopPropagation();
    e.preventDefault();
    
    const url = avatarUrlInputRef.current.value;
    if(!url) return;

    avatarFileInputRef.current.value=''
    fetch(url)
      .then(res=>res.blob())
      .then(blob=>handleImageContent(blob,setAvatar))
      .then(()=>{ avatarFileInputRef.current.value='' });
  };
  
  const setAvatar=(im)=>{
    avatarImageRef.current.src=im;
    newEmployee = { ...newEmployee, avatar: im };
  };

  const handleImageContent = async (blob,cb)=>{
    if (blob && blob.type.match(/^image\//)) {
      const reader = new FileReader();
      
      reader.readAsDataURL(blob, "UTF-8");
      reader.onload = (evt)=>{
          const im = new Image();
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
  
          canvas.width = avatarImageSize.width;
          canvas.height = avatarImageSize.height;

          im.src=evt.target.result;
          im.onload = ()=>{
            ctx.drawImage(im, 0, 0, avatarImageSize.width, avatarImageSize.height);
            cb(canvas.toDataURL("image/png", 0.1));
          };
      }
      reader.onerror = (evt) => {
          new Error( "error reading file" );
      };
    }
  };

  const addEmployee = () => {
    // TODO: Add validations
    // TODO: Add an employee to the table
    const [ last_name, first_name ] = nameInputRef.current.value.split(/,/).map(n=>n.trim());
    const email = emailInputRef.current.value.trim().toLocaleLowerCase();
    
    if(!( last_name && first_name && email ))return;
    if(!email.match(emailPattern)) return;
    if(![ last_name, first_name ].join(', ').match(namePattern)) return;
    
    const id=employees.reduce( ( id, emp ) => Math.max( id, emp.id ), 0 )+1;

    newEmployee = {...newEmployee, ...{ id, last_name, first_name, email }};
    
    if(!newEmployee.avatar)
      newEmployee.avatar=defaultAvatarURI;
  
    if(newEmployee.id && !employees.find(emp=>emp.email===newEmployee.email)){
      setEmployees([...employees, newEmployee])
      newEmployee = { ...initialEmployee }

      nameInputRef.current.value=''
      emailInputRef.current.value=''
      avatarUrlInputRef.current.value=''
      avatarFileInputRef.current.value=''
      avatarImageRef.current.src=defaultAvatarURI
    }
  }

  const deleteEmployee = (id) => {
    // TODO: Delete an employee from the table
    setEmployees(employees.filter(employee=>employee.id!==id))

  }

  const resetAvatar = ()=>{
    avatarUrlInputRef.current.value=''
    avatarFileInputRef.current.value=''
    avatarImageRef.current.src=defaultAvatarURI
  }
  window.ondragover = function(e) { e.preventDefault(); return false };
  window.ondrop = function(e) { e.preventDefault(); return false };
  return (<div>
    <div className="container">
      <h2 className="mb-4">Employees</h2>
      {
        loading?<Spinner />:
        <Table className="table table-hover table-bordered table-sortable">
          <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            {/* <!-- TODO: Add a column for an avatar --> */}
            <th scope="col">Avatar</th>
            <th scope="col">Actions</th>
          </tr>
          </thead>
          <tbody>
          {employees.map( (employee) => 
            <tr key={employee.id}>
              <td>{employee.id}</td>
              <td>{employee.last_name}, {employee.first_name} </td>
              <td>{employee.email}</td>
              <td><Img src={employee.avatar} className="rounded" width={avatarImageSize.width} height={avatarImageSize.height} /></td>
              <td><Button type="button" variant="danger" onClick={()=>deleteEmployee(employee.id)}>Delete</Button></td>
            </tr>
          )}
          <tr className="input-row">
            <td>#</td>
            <td><input type="text" ref={nameInputRef} placeholder="Last name, First name" className="form-control" required pattern={namePattern}/></td>
            <td><input type="email" ref={emailInputRef} placeholder="Email" className="form-control" required pattern={emailPattern}/></td>
            <td onDrop={getFileContent}>
                <input type="image" alt="avatar" className="rounded" ref={avatarImageRef} src={defaultAvatarURI} />
                <Button type="button" className="btn btn-secondary m-4" onClick={resetAvatar}>resetAvatar</Button>
                <div><span>Drag image file here to upload</span></div>
                <div className="hr"><span>or</span></div>
                <input type="url" ref={avatarUrlInputRef} placeholder="Insert Avatar URL" className="form-control" pattern={urlPattern} onChange={getUrlContent}/>
                <div className="hr"><span>or</span></div>
                <Form.Control type="file" accept="image/png, image/jpeg" ref={avatarFileInputRef} onChange={getFileContent} />
            </td>
            <td><Button type="submit" variant="success" onClick={addEmployee}>Add</Button></td>
          </tr>
          </tbody>
        </Table>
      }
    </div>
  </div>)
}

export default Employees;