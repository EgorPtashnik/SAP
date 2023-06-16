namespace ToDo;

using { cuid, managed } from '@sap/cds/common';


entity TodoCategory : cuid {
    name    : String(100);
    Items   : Composition of many TodoCategory.Items on Items.category = $self;
}

entity TodoCategory.Items : cuid, managed {
    key category    : Association to TodoCategory;
    name            : String(100);
    description     : String(500);
    status          : Integer enum {
        todo        =  1;
        inprogress  =  2;
        done        =  3;
        canceled    = -1;
    }
}