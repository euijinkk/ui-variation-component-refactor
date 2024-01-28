## UI variation에 유연하게 대응하기

- [1.](https://github.com/euijinkk/compound-component/tree/main/src/components/spaghetti) 먼저 컴포넌트가 스파게티가 되어가는 과정을 다룹니다
- [2.](https://github.com/euijinkk/compound-component/tree/main/src/components/refactor) 컴포넌트를 리팩터링 합니다.

목표는 아래와 같습니다.

1. 반복되는 코드는 single source of truth를 유지하고, 재사용 가능하게 만든다.
2. 컴포넌트 각자가 독립적으로 책임을 가지도록 한다.
3. 사용처에 따라서, 독립적인 컴포넌트를 조합하여 유연하게 사용할 수 있도록 한다.
