import { useState } from "react";
import {
  Accordion,
  SplitLayout,
  SplitCol,
  Div,
  Panel,
  PanelHeader,
  Group,
  SimpleCell,
  Card,
  CardGrid,
  Avatar,
  Title,
  Spacing,
  Separator,
  SubnavigationButton,
  SubnavigationBar,
} from "@vkontakte/vkui";
import {
  Icon28Users3,
  Icon28LockOutline,
  Icon28UserStarOutline,
  Icon28Users,
  Icon24Filter,
} from "@vkontakte/icons";
import PropTypes from "prop-types";
import "@vkontakte/vkui/dist/vkui.css";
import Filters from "./components/filters";
import groupsData from "./api/groups.json";

export function App() {
  const [filterPrivacy, setFilterPrivacy] = useState(["Все"]);
  const [filterColor, setFilterColor] = useState(["Все"]);
  const [filterFriendship, setFilterFriendship] = useState("Не важно");
  const [filtersModalOpened, setFiltersModalOpened] = useState(false);

  const openModal = () => {
    setFiltersModalOpened(true);
  };

  const closeModal = () => {
    setFiltersModalOpened(false);
  };

  const applyFilters = () => {
    // Ничего особенного тут не реализовывал
    closeModal();
  };

  const filteredGroups = groupsData.filter((group) => {
    // Фильтрация по типу приватности
    if (!filterPrivacy.includes("Все")) {
      if (group.closed && !filterPrivacy.includes("Закрытая")) return false;
      if (!group.closed && !filterPrivacy.includes("Открытая")) return false;
    }

    // Фильтрация по цвету аватарки
    if (!filterColor.includes("Все")) {
      if (!filterColor.includes(group.avatar_color)) return false;
    }

    // Фильтрация по наличию друзей
    if (filterFriendship === "Есть") {
      if (!group.friends || group.friends.length === 0) return false;
    } else if (filterFriendship === "Нет") {
      if (group.friends && group.friends.length > 0) return false;
    }

    return true;
  });

  return (
    <SplitLayout
      style={{ justifyContent: "center" }}
      header={<PanelHeader delimiter="none" />}
      modal={
        <Filters
          openModal={filtersModalOpened}
          closeModal={closeModal}
          applyFilters={applyFilters}
          filterPrivacy={filterPrivacy}
          setFilterPrivacy={setFilterPrivacy}
          filterColor={filterColor}
          setFilterColor={setFilterColor}
          filterFriendship={filterFriendship}
          setFilterFriendship={setFilterFriendship}
        />
      }
    >
      <SplitCol width="100%" stretchedOnMobile autoSpaced>
        <Panel id="main">
          <PanelHeader>Список групп (тест)</PanelHeader>
          <SubnavigationBar>
            <SubnavigationButton
              before={<Icon24Filter />}
              expandable
              onClick={openModal}
            >
              Фильтры
            </SubnavigationButton>
          </SubnavigationBar>
          <Group>
            <CardGrid size="s">
              {filteredGroups.map((group) => (
                <Card key={group.id} mode="shadow">
                  <SimpleCell
                    before={<Icon28Users3 />}
                    after={
                      <Avatar
                        size={100}
                        style={{
                          backgroundColor: group.avatar_color || "lightgray",
                          margin: "5% 0",
                        }}
                      />
                    }
                  >
                    <Title level="2">{group.name}</Title>
                  </SimpleCell>
                  <Spacing size={12}>
                    <Separator />
                  </Spacing>
                  <SimpleCell before={<Icon28LockOutline />}>
                    {group.closed ? "Закрытая" : "Открытая"}
                  </SimpleCell>
                  <SimpleCell before={<Icon28UserStarOutline />}>
                    {`Подписчики: ${group.members_count}`}
                  </SimpleCell>
                  <Accordion open>
                    <Accordion.Summary
                      iconPosition="after"
                      before={<Icon28Users />}
                    >
                      {`Ваших друзей в группе: ${
                        group.friends ? group.friends.length : "нет"
                      }`}
                    </Accordion.Summary>
                    {group.friends && group.friends.length > 0 && (
                      <Accordion.Content>
                        <Div>
                          {group.friends.map((friend, index) => (
                            <div
                              key={index}
                            >{`${friend.first_name} ${friend.last_name}`}</div>
                          ))}
                        </Div>
                      </Accordion.Content>
                    )}
                  </Accordion>
                </Card>
              ))}
            </CardGrid>
          </Group>
        </Panel>
      </SplitCol>
    </SplitLayout>
  );
}

App.propTypes = {
  initialPanel: PropTypes.string.isRequired,
};
