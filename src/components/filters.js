/* eslint-disable react/prop-types */
import {
  Checkbox,
  FormItem,
  Button,
  ModalRoot,
  ModalPage,
  ModalPageHeader,
  PanelHeaderClose,
  FormLayoutGroup,
} from "@vkontakte/vkui";

const Filters = (props) => {
  const PRIVACY_TYPE = [
    { value: "Все", label: "Все" },
    { value: "Закрытая", label: "Закрытая" },
    { value: "Открытая", label: "Открытая" },
  ];

  const AVATAR_COLOR = [
    { value: "Все", label: "Все" },
    { value: "red", label: "Красная" },
    { value: "green", label: "Зеленая" },
    { value: "blue", label: "Синяя" },
    { value: "purple", label: "Фиолетовая" },
    { value: "white", label: "Белая" },
    { value: "yellow", label: "Желтая" },
    { value: "orange", label: "Оранжевая" },
  ];

  const FRIENDSHIP = [
    { value: "Не важно", label: "Не важно" },
    { value: "Есть", label: "Есть" },
    { value: "Нет", label: "Нет" },
  ];

  const onChangeFilterPrivacy = (e) => {
    const { value, checked } = e.currentTarget;
    // Обновляем состояние фильтрации по приватности
    if (checked) {
      props.setFilterPrivacy((prevFilters) => {
        // Если выбрана приватность "Все", снимаем отметку со всех других приватностей
        if (value === "Все") return ["Все"];
        // Если выбран какой-то конкретный тип приватности, снимаем отметку с "Все"
        return prevFilters.includes("Все") ? [value] : [...prevFilters, value];
      });
    } 
    else {
      // Если выбираем "Все", то снимаем отметку со всех приватностей
      if (value === "Все") {
        props.setFilterPrivacy(["Все"]);
      } else {
        // Если снимаем выбор с конкретной приватности, убираем ее из фильтров
        props.setFilterPrivacy(props.filterPrivacy.filter((v) => v !== value));
      }
    }
  };

  const onChangeFilterColor = (e) => {
    const { value, checked } = e.currentTarget;
    // Обновляем состояние фильтрации по цвету
    if (checked) {
      props.setFilterColor((prevFilters) => {
        // Если выбран цвет "Все", снимаем отметку со всех других цветов
        if (value === "Все") return ["Все"];
        // Если выбран какой-то конкретный цвет, снимаем отметку с "Все"
        return prevFilters.includes("Все") ? [value] : [...prevFilters, value];
      });
    } else {
      // Если выбираем "Все", то снимаем отметку со всех цветов
      if (value === "Все") {
        props.setFilterColor(["Все"]);
      } else {
        // Если снимаем выбор с конкретного цвета, убираем его из фильтров
        props.setFilterColor(props.filterColor.filter((v) => v !== value));
      }
    }
  };

  const onChangeFilterFriendship = (e) => {
    const { value } = e.currentTarget;
    props.setFilterFriendship(value);
  };

  return (
    <ModalRoot
      activeModal={props.openModal ? "filters" : null}
      onClose={props.closeModal}
    >
      <ModalPage
        id="filters"
        header={
          <ModalPageHeader
            before={<PanelHeaderClose onClick={props.closeModal} />}
          >
            Фильтры
          </ModalPageHeader>
        }
      >
        <FormLayoutGroup>
          <FormItem top="Тип приватности">
            {PRIVACY_TYPE.map(({ value, label }) => (
              <Checkbox
                key={value}
                value={value}
                checked={props.filterPrivacy.includes(value)}
                onChange={onChangeFilterPrivacy}
              >
                {label}
              </Checkbox>
            ))}
          </FormItem>
          <FormItem top="Цвет аватарки">
            {AVATAR_COLOR.map(({ value, label }) => (
              <Checkbox
                key={value}
                value={value}
                checked={props.filterColor.includes(value)}
                onChange={onChangeFilterColor}
              >
                {label}
              </Checkbox>
            ))}
          </FormItem>
          <FormItem top="Есть друзья в группе?">
            {FRIENDSHIP.map(({ value, label }) => (
              <Checkbox
                key={value}
                value={value}
                checked={props.filterFriendship === value}
                onChange={onChangeFilterFriendship}
              >
                {label}
              </Checkbox>
            ))}
          </FormItem>
          <FormItem>
            <Button size="l" stretched onClick={props.applyFilters}>
              Показать результаты
            </Button>
          </FormItem>
        </FormLayoutGroup>
      </ModalPage>
    </ModalRoot>
  );
};

export default Filters;
