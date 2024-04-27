import { newMockEvent } from "matchstick-as"
import { ethereum, BigInt, Address } from "@graphprotocol/graph-ts"
import {
  CloseLoan,
  ClosePosition,
  NewLoan,
  NewPool,
  NewPosition,
  OwnershipTransferStarted,
  OwnershipTransferred
} from "../generated/Electron/Electron"

export function createCloseLoanEvent(
  poolId: BigInt,
  account: Address,
  state: i32,
  repaidDate: BigInt
): CloseLoan {
  let closeLoanEvent = changetype<CloseLoan>(newMockEvent())

  closeLoanEvent.parameters = new Array()

  closeLoanEvent.parameters.push(
    new ethereum.EventParam("poolId", ethereum.Value.fromUnsignedBigInt(poolId))
  )
  closeLoanEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  )
  closeLoanEvent.parameters.push(
    new ethereum.EventParam(
      "state",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(state))
    )
  )
  closeLoanEvent.parameters.push(
    new ethereum.EventParam(
      "repaidDate",
      ethereum.Value.fromUnsignedBigInt(repaidDate)
    )
  )

  return closeLoanEvent
}

export function createClosePositionEvent(
  poolId: BigInt,
  account: Address
): ClosePosition {
  let closePositionEvent = changetype<ClosePosition>(newMockEvent())

  closePositionEvent.parameters = new Array()

  closePositionEvent.parameters.push(
    new ethereum.EventParam("poolId", ethereum.Value.fromUnsignedBigInt(poolId))
  )
  closePositionEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  )

  return closePositionEvent
}

export function createNewLoanEvent(
  poolId: BigInt,
  account: Address,
  principal: BigInt,
  collateral: BigInt,
  state: i32,
  startDate: BigInt
): NewLoan {
  let newLoanEvent = changetype<NewLoan>(newMockEvent())

  newLoanEvent.parameters = new Array()

  newLoanEvent.parameters.push(
    new ethereum.EventParam("poolId", ethereum.Value.fromUnsignedBigInt(poolId))
  )
  newLoanEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  )
  newLoanEvent.parameters.push(
    new ethereum.EventParam(
      "principal",
      ethereum.Value.fromUnsignedBigInt(principal)
    )
  )
  newLoanEvent.parameters.push(
    new ethereum.EventParam(
      "collateral",
      ethereum.Value.fromUnsignedBigInt(collateral)
    )
  )
  newLoanEvent.parameters.push(
    new ethereum.EventParam(
      "state",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(state))
    )
  )
  newLoanEvent.parameters.push(
    new ethereum.EventParam(
      "startDate",
      ethereum.Value.fromUnsignedBigInt(startDate)
    )
  )

  return newLoanEvent
}

export function createNewPoolEvent(
  poolId: BigInt,
  principalId: Address,
  collateralId: Address,
  totalSupplied: BigInt,
  totalBorrowed: BigInt,
  interest: BigInt
): NewPool {
  let newPoolEvent = changetype<NewPool>(newMockEvent())

  newPoolEvent.parameters = new Array()

  newPoolEvent.parameters.push(
    new ethereum.EventParam("poolId", ethereum.Value.fromUnsignedBigInt(poolId))
  )
  newPoolEvent.parameters.push(
    new ethereum.EventParam(
      "principalId",
      ethereum.Value.fromAddress(principalId)
    )
  )
  newPoolEvent.parameters.push(
    new ethereum.EventParam(
      "collateralId",
      ethereum.Value.fromAddress(collateralId)
    )
  )
  newPoolEvent.parameters.push(
    new ethereum.EventParam(
      "totalSupplied",
      ethereum.Value.fromUnsignedBigInt(totalSupplied)
    )
  )
  newPoolEvent.parameters.push(
    new ethereum.EventParam(
      "totalBorrowed",
      ethereum.Value.fromUnsignedBigInt(totalBorrowed)
    )
  )
  newPoolEvent.parameters.push(
    new ethereum.EventParam(
      "interest",
      ethereum.Value.fromUnsignedBigInt(interest)
    )
  )

  return newPoolEvent
}

export function createNewPositionEvent(
  poolId: BigInt,
  account: Address,
  principal: BigInt,
  startDate: BigInt
): NewPosition {
  let newPositionEvent = changetype<NewPosition>(newMockEvent())

  newPositionEvent.parameters = new Array()

  newPositionEvent.parameters.push(
    new ethereum.EventParam("poolId", ethereum.Value.fromUnsignedBigInt(poolId))
  )
  newPositionEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  )
  newPositionEvent.parameters.push(
    new ethereum.EventParam(
      "principal",
      ethereum.Value.fromUnsignedBigInt(principal)
    )
  )
  newPositionEvent.parameters.push(
    new ethereum.EventParam(
      "startDate",
      ethereum.Value.fromUnsignedBigInt(startDate)
    )
  )

  return newPositionEvent
}

export function createOwnershipTransferStartedEvent(
  previousOwner: Address,
  newOwner: Address
): OwnershipTransferStarted {
  let ownershipTransferStartedEvent = changetype<OwnershipTransferStarted>(
    newMockEvent()
  )

  ownershipTransferStartedEvent.parameters = new Array()

  ownershipTransferStartedEvent.parameters.push(
    new ethereum.EventParam(
      "previousOwner",
      ethereum.Value.fromAddress(previousOwner)
    )
  )
  ownershipTransferStartedEvent.parameters.push(
    new ethereum.EventParam("newOwner", ethereum.Value.fromAddress(newOwner))
  )

  return ownershipTransferStartedEvent
}

export function createOwnershipTransferredEvent(
  previousOwner: Address,
  newOwner: Address
): OwnershipTransferred {
  let ownershipTransferredEvent = changetype<OwnershipTransferred>(
    newMockEvent()
  )

  ownershipTransferredEvent.parameters = new Array()

  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam(
      "previousOwner",
      ethereum.Value.fromAddress(previousOwner)
    )
  )
  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam("newOwner", ethereum.Value.fromAddress(newOwner))
  )

  return ownershipTransferredEvent
}
