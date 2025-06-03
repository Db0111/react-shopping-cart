import type { Meta, StoryObj } from "@storybook/react-vite";
import { http, HttpResponse } from "msw";
import CartPage from "./CartPage";

const meta = {
  component: CartPage,
} satisfies Meta<typeof CartPage>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockData = {
  content: [
    {
      id: 101,
      quantity: 1,
      product: {
        id: 1,
        name: "유기농 바나나",
        price: 4500,
        imageUrl:
          "https://i.namu.wiki/i/Mj0aArUbJiq5_c500MqmbYyDPWnSiDBCsxbesdkR0XTOtDvwrjj2ponJvctbYgQ7zPE_LvjsJHAl786rZu0tkw.webp",
        category: "식료품",
        stock: 3,
      },
    },
    {
      id: 102,
      quantity: 1,
      product: {
        id: 2,
        name: "신선한 사과 1kg",
        price: 7900,
        imageUrl:
          "https://i.namu.wiki/i/QHZlaOvDdhvtLDYrA6IRvUZdddgwY9q5d0rMBywEIh7dbcNTCzTmE2CDM05JA9GRuXWqp5LsxE_T8BvGNOJhVA.webp",
        category: "식료품",
        stock: 3,
      },
    },
    {
      id: 103,
      quantity: 1,
      product: {
        id: 3,
        name: "무항생제 닭가슴살 500g",
        price: 8900,
        imageUrl:
          "https://health.chosun.com/site/data/img_dir/2021/11/04/2021110401776_0.jpg",
        category: "식료품",
        stock: 0,
      },
    },
  ],
};

const END_POINT = "*/cart-items";

export const MockedSuccess: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get(END_POINT, async () => {
          return HttpResponse.json(mockData);
        }),
      ],
    },
  },
};

export const UnauthorizedError: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get(END_POINT, async () => {
          return HttpResponse.json(
            { message: "Unauthorized" },
            { status: 401 }
          );
        }),
      ],
    },
  },
};

export const ForbiddenError: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get(END_POINT, async () => {
          return HttpResponse.json({ message: "Forbidden" }, { status: 403 });
        }),
      ],
    },
  },
};

export const NotFoundError: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get(END_POINT, async () => {
          return HttpResponse.json({ message: "Not Found" }, { status: 404 });
        }),
      ],
    },
  },
};

export const InternalServerError: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get(END_POINT, async () => {
          return HttpResponse.json(
            { message: "Internal Server Error" },
            { status: 500 }
          );
        }),
      ],
    },
  },
};

export const NetworkError: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get(END_POINT, async () => {
          return HttpResponse.error();
        }),
      ],
    },
  },
};
