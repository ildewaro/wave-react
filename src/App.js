
import './App.css';
import { useState } from "react";
import FeatureService from "./service/feature-service.ts";
import CommentService from "./service/commet-service.ts";
import { elapsed, dateToString } from './tools/util-dates.tsx';
import Pager from './atom/pager.tsx';

/**
 * Componente App - Renderiza la lista de eventos
 * @param props 
 * @returns 
 */
function App() {

  const [features, setFeatures] = useState([]);
  const [magType, setMagType] = useState(['ml']);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(2);
  const [newComment, setNewComment] = useState({
    author_name: "",
    body: ""
  });

  
  /**
   * Funcion para obtener data de features invocando servicio correspondiente 
   * @param {*} _currentPage 
   * @param {*} _itemsPerPage 
   * @returns 
   */
  const fetchFeatures = async (_currentPage, _itemsPerPage, _magType) => {
    const fetchedFeatures = await FeatureService.getFeatures(_currentPage, _itemsPerPage, _magType);
    const totalItems = fetchedFeatures.pagination.total;

    setFeatures(fetchedFeatures.data);
    setCurrentPage(_currentPage);
    setItemsPerPage(_itemsPerPage);
    return fetchedFeatures;
  };


  const handleCheckboxChange = async (e) => {
    let newArray = [...magType];
    if (!e.target.checked) {
      newArray = newArray.filter(d => d != e.target.id)
    }
    if (e.target.checked && !newArray.includes(e.target.id)) {
      newArray.push(e.target.id);
    }
    setMagType(newArray);
    console.log(newArray);
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setNewComment({...newComment,
      [e.target.name]: value
    });
  };

  const handleOnCreateComment  = async (feature) => {
    const commentData = {
      author_name: newComment.author_name,
      body: newComment.body
    };

    CommentService.createComment(feature.id,commentData)
    .then(data => feature.comments.push(data));
  }
  return (
    <>
      <header>
        <div className="navbar navbar-dark bg-dark box-shadow">
          <div className="container d-flex justify-content-between">
            <a href="#" className="navbar-brand d-flex align-items-center">
              <strong className='wave-name'><i className="fa fa-globe" aria-hidden="true"></i>
                Wave</strong>
            </a>

          </div>
        </div>
      </header>
      <main role="main">
        <section className=" text-center" />

        <div className="album py-5 bg-light">
          {/* Paginador */}
          <Pager fetchFunction={fetchFeatures} magType={magType} />

          <div className="container">
            <div className="row">

              <div className="px-3 pb-2 d-md-flex justify-content-md-end align-items-center">
                <small className="text-muted mx-2">Magnitud : </small>
                {Array.from(['md', 'ml', 'ms', 'mw', 'me', 'mi', 'mb', 'mlg']).map(d => (
                  <div class="form-check form-check-inline">
                    <input class="form-check-input" type="checkbox" id={d} value={d} onChange={handleCheckboxChange} />
                    <label class="form-check-label" for="md">{d.toUpperCase()}</label>
                  </div>
                ))}
              </div>

              {features.map(d => (
                <div className="col-md-4" key={d.id}>
                  <div className={"card " + (d.attributes.tsunami ? 'border-danger' : 'border-success') + " mb-4 box-shadow"}>
                    <div className={"card-header " + (d.attributes.tsunami ? 'bg-red-ligth' : 'bg-green-ligth') + " mb-4 box-shadow"}>
                      <img className="py-3 card-img-top" src={process.env.PUBLIC_URL + (d.attributes.tsunami ? '/tsunami.png' : '/tierra_no_calm.png')} />
                      <h4 className="card-text">{d.attributes.title}</h4>
                      <div className="d-flex justify-content-between align-items-center">
                        <span className="badge bg-warning">{'Magnitud: ' + d.attributes.magnitude}</span>
                        {d.attributes.tsunami ? <span className="badge bg-danger">{"Tsunami"}</span> : null}
                      </div>
                    </div>
                    <div className="card-body pt-0">
                      <h6 className="card-title"><i className="fa fa-map-marker" aria-hidden="true"></i>
                        {' ' + d.attributes.place}</h6>
                      <div className="d-flex justify-content-between align-items-center">

                        <small className="text-muted">{'Fecha: ' + dateToString(d.attributes.time)}</small>
                        <small className="text-muted">{'Hace: ' + elapsed(d.attributes.time)}</small>

                      </div>
                      <div className='comments py-4'>
                        <ul className="nav nav-tabs" id="myTab" role="tablist">
                          <li className="nav-item" role="presentation">
                            <button className="nav-link active" id="comments-tab" data-bs-toggle="tab" data-bs-target={'#comments-of-' + d.id} type="button" role="tab" aria-controls="home" aria-selected="true">
                              {d.comments.length} Comentarios
                            </button>
                          </li>
                          <li className="nav-item" role="presentation">
                            <button className="nav-link" id="newcomment-tab" data-bs-toggle="tab" data-bs-target={'#newcomment-of-' + d.id} type="button" role="tab" aria-controls="profile" aria-selected="false">
                              Nuevo comentario</button>
                          </li>
                        </ul>

                        <div className="tab-content" id="myTabContent">
                          <div className="tab-pane fade show active" id={'comments-of-' + d.id} role="tabpanel" aria-labelledby="comments-tab">
                            <div className="block">
                              <div className="reading">
                                {d.comments.map((c, i) => (
                                  <div className="comment" key={i}>
                                    <div className="user-banner">
                                      <div className="user">
                                        <h7>{c.author_name}: </h7>
                                      </div>
                                    </div>
                                    <div className="content">
                                      <p>{'"' + c.body + '"'}</p>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>

                          <div className="tab-pane fade" id={'newcomment-of-' + d.id} role="tabpanel" aria-labelledby="newcomment-tab">
                            <div className="block">
                              <form>
                                <div class="py-3 px-3 form-row">
                                  <div className="form-group">
                                    <input className="form-control form-control-sm"  placeholder="@Autor" name='author_name' 
                                     value={newComment.author_name}
                                     onChange={handleChange}
                                    />
                                  </div>
                                  <div className="py-2 form-group">
                                    <textarea className="form-control textarea" id="exampleFormControlTextarea1"  name='body'
                                    value={newComment.body}
                                    onChange={handleChange}
                                    rows="3" placeholder="Tu comentario"></textarea>
                                  </div>
                                </div>


                                <div className="px-3 pb-2 d-md-flex justify-content-md-end">
                                  <button onClick={(e) =>  handleOnCreateComment(d)} className="btn btn-primary my-2 btn-xs float-right">Enviar</button>
                                </div>

                              </form>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </main >

    </>
  );
}

export default App;
