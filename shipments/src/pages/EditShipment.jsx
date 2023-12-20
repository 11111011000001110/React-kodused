import { Fragment } from 'react'
import { useParams } from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const EditShipment = (params) => {
    const {index} = useParams();
    
    const setShipments=params.setShipments;
    const shipments=params.shipments;
    const shipment=params.shipments[index];
    
    const cancelForm = ()=>{
        navigation.back()
    }
    
    const submitForm = (e)=>{
        e.preventDefault()
        for(const input in shipment){
            shipment[input]=(e.target[input].value)
        }
        setShipments(shipments);
        navigation.back()
    }
    
    return (
        <Fragment>
            <div>Shipment Details</div>
            <Form onSubmit={submitForm}>
                <Form.Group className="mb-3 col-md-6" controlId="orderNo">
                    <Form.Label>orderNo</Form.Label>
                    <Form.Control type="text" defaultValue={shipment.orderNo} />
                    <Form.Text className="text-muted"> </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3 col-md-6" controlId="date">
                    <Form.Label>date</Form.Label>
                    <Form.Control type="text" defaultValue={shipment.date} />
                    <Form.Text className="text-muted"> </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3 col-md-6" controlId="customer">
                    <Form.Label>customer</Form.Label>
                    <Form.Control type="text" defaultValue={shipment.customer} />
                    <Form.Text className="text-muted"> </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3 col-md-6" controlId="trackingNo">
                    <Form.Label>trackingNo</Form.Label>
                    <Form.Control type="text" defaultValue={shipment.trackingNo} />
                    <Form.Text className="text-muted"> </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3 col-md-6" controlId="status">
                    <Form.Label>status</Form.Label>
                    <Form.Control type="text" defaultValue={shipment.status} />
                    <Form.Text className="text-muted"> </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3 col-md-6" controlId="consignee">
                    <Form.Label>consignee</Form.Label>
                    <Form.Control type="text" defaultValue={shipment.consignee} />
                    <Form.Text className="text-muted"> </Form.Text>
                </Form.Group>
                <Button variant="primary" onClick={cancelForm}>Cancel</Button>
                <Button variant="danger" type="submit">Save</Button>
            </Form>
        </Fragment>
    )

}

export default EditShipment