import React from "react";

import { Row, Card, Badge, CustomInput, Button } from "reactstrap";
import { Colxx } from "../components/CustomBootstrap";
import { ContextMenuTrigger } from "react-contextmenu";
import classnames from "classnames";
import * as moment from "moment";

const SkillCard = props => {
  const {
    id,
    version,
    name,
    author,
    company,
    createdAt,
    checkEventHandler,
    editEventHandler,
    selectedItems
  } = props;
  return (
    <Row>
      <Colxx xxs="12" className="mb-3">
        <ContextMenuTrigger id="menu_id" data={id}>
          <Card
            className={classnames({ active: selectedItems.includes(id) })}
          >
            <div className="pl-2 d-flex flex-grow-1 min-width-zero">
              <div className="card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center">
                <p className="mb-1 text-small w-5">
                  <Button
                    color="empty"
                    className="pt-0 pl-0"
                    onClick={editEventHandler.bind(this, id)}
                  >
                    Edit
                  </Button>
                </p>
                <p className="list-item-heading mb-1 truncate w-5">{name}</p>
                <p className="mb-1 text-muted w-10 w-sm-100">
                  <Badge color="primary" pill>
                    {version}
                  </Badge>
                </p>
                <p className="mb-1 text-small w-10 w-sm-100">{author}</p>
                <p className="mb-1 text-small w-10 w-sm-100">{company}</p>
                <p className="mb-1 text-small w-10 w-sm-100">
                  {`${moment(createdAt).format("DD-MMM-YYYY HH:MM:SS a")}`}
                </p>
              </div>
              <div className="custom-control custom-checkbox pl-1 align-self-center pr-4">
                <CustomInput
                  className="itemCheck mb-0"
                  type="checkbox"
                  id={`check_${id}`}
                  onChange={checkEventHandler.bind(this, id)}
                  label=""
                />
              </div>
            </div>
          </Card>
        </ContextMenuTrigger>
      </Colxx>
    </Row>
  );
};

export default SkillCard;
