using { ToDo } from '../../db/Schema';

service todoService {
    entity TodoCategory as projection on ToDo.TodoCategory;
    entity Todo         as projection on ToDo.TodoCategory.Items;
}